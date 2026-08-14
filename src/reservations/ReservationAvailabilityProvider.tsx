import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { fetchAvailability } from "./reservationApi";
import type { ReservationSlot } from "./types";
import { getReservationSlotStatus } from "../../shared/reservations/domain";

const REFRESH_INTERVAL_MS = 15_000;

type ReservationAvailabilityValue = {
  slots: ReservationSlot[];
  updatedAt: Date | null;
  loading: boolean;
  error: boolean;
  stale: boolean;
  refresh: (signal?: AbortSignal) => Promise<void>;
};

const ReservationAvailabilityContext =
  createContext<ReservationAvailabilityValue | null>(null);

export function ReservationAvailabilityProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [slots, setSlots] = useState<ReservationSlot[]>([]);
  const [serverOffsetMs, setServerOffsetMs] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [stale, setStale] = useState(false);
  const hasUsableData = useRef(false);
  const latestServerTime = useRef(Number.NEGATIVE_INFINITY);
  const latestRequest = useRef(0);

  const refresh = useCallback(async (signal?: AbortSignal) => {
    const requestId = ++latestRequest.current;
    try {
      const response = await fetchAvailability(signal);
      const receivedAt = Date.now();
      const responseServerTime = Date.parse(response.serverTime);
      if (Number.isNaN(responseServerTime)) {
        throw new Error("Reservation API returned an invalid server time.");
      }
      if (requestId !== latestRequest.current) return;
      if (responseServerTime < latestServerTime.current) {
        throw new Error("Reservation API server time moved backwards.");
      }
      latestServerTime.current = responseServerTime;
      hasUsableData.current = true;
      setSlots(response.slots);
      setServerOffsetMs(responseServerTime - receivedAt);
      setUpdatedAt(new Date(receivedAt));
      setError(false);
      setStale(false);
    } catch (requestError) {
      if (
        requestError instanceof DOMException &&
        requestError.name === "AbortError"
      ) {
        return;
      }
      if (requestId !== latestRequest.current) return;
      if (hasUsableData.current) setStale(true);
      else setError(true);
    } finally {
      if (!signal?.aborted && requestId === latestRequest.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void refresh(controller.signal);
    return () => controller.abort();
  }, [refresh]);

  useEffect(() => {
    const clock = window.setInterval(() => setNow(Date.now()), 1_000);
    const poll = window.setInterval(() => {
      if (document.visibilityState === "visible") void refresh();
    }, REFRESH_INTERVAL_MS);
    return () => {
      window.clearInterval(clock);
      window.clearInterval(poll);
    };
  }, [refresh]);

  const liveSlots = useMemo(() => {
    const serverNow = now + serverOffsetMs;
    return slots.map((slot) => ({
      ...slot,
      status: getReservationSlotStatus(slot, serverNow),
    }));
  }, [now, serverOffsetMs, slots]);

  const value = useMemo(
    () => ({ slots: liveSlots, updatedAt, loading, error, stale, refresh }),
    [error, liveSlots, loading, refresh, stale, updatedAt],
  );

  return (
    <ReservationAvailabilityContext.Provider value={value}>
      {children}
    </ReservationAvailabilityContext.Provider>
  );
}

export function useReservationAvailability() {
  const context = useContext(ReservationAvailabilityContext);
  if (!context) {
    throw new Error(
      "useReservationAvailability must be used within ReservationAvailabilityProvider",
    );
  }
  return context;
}
