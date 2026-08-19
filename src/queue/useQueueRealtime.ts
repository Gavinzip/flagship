import { useCallback, useEffect, useRef, useState } from "react";
import { fetchQueueSnapshot, openQueueEvents } from "./queueApi";
import type { QueueSnapshot } from "../../shared/queue/domain";

export type QueueConnectionStatus = "connecting" | "live" | "offline";

export function useQueueRealtime() {
  const [snapshot, setSnapshot] = useState<QueueSnapshot | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<QueueConnectionStatus>("connecting");
  const [rangeUpdatesSupported, setRangeUpdatesSupported] = useState(false);
  const latestRevision = useRef(-1);

  const acceptSnapshot = useCallback(
    (next: QueueSnapshot, supportsRangeUpdates = true) => {
      if (next.revision < latestRevision.current) return;
      latestRevision.current = next.revision;
      setSnapshot(next);
      setRangeUpdatesSupported(supportsRangeUpdates);
    },
    [],
  );

  useEffect(() => {
    const controller = new AbortController();
    let disposed = false;
    let events: EventSource | null = null;

    void fetchQueueSnapshot(controller.signal)
      .then(({ snapshot: next, rangeUpdatesSupported: supported }) => {
        acceptSnapshot(next, supported);
      })
      .catch(() => {
        if (!disposed) setConnectionStatus("offline");
      });

    events = openQueueEvents(acceptSnapshot);
    events.addEventListener("open", () => {
      if (!disposed) {
        setConnectionStatus("live");
      }
    });
    events.addEventListener("error", () => {
      if (!disposed) {
        setConnectionStatus("offline");
      }
    });

    return () => {
      disposed = true;
      controller.abort();
      events?.close();
    };
  }, [acceptSnapshot]);

  return {
    snapshot,
    connectionStatus,
    rangeUpdatesSupported,
    acceptSnapshot,
  };
}
