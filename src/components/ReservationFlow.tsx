import { useCallback, useEffect, useId, useRef, useState } from "react";
import { RefreshDouble, WarningTriangle } from "iconoir-react";
import { useLocale } from "../i18n/LocaleProvider";
import { useReservationFlow } from "../reservations/useReservationFlow";
import { ReservationAvailabilityState } from "./reservation/ReservationAvailabilityState";
import type { CapacityCelebration } from "./reservation/ReservationCapacityMeter";
import {
  ReservationCapacityTransfer,
  type CapacityTransferPlan,
} from "./reservation/ReservationCapacityTransfer";
import { ReservationConfirmationDialog } from "./reservation/ReservationConfirmationDialog";
import { ReservationSelectStep } from "./reservation/ReservationSelectStep";
import { ReservationSuccessState } from "./reservation/ReservationSuccessState";

export function ReservationFlow() {
  const instanceId = useId();
  const { content, locale } = useLocale();
  const copy = content.tickets;
  const flow = useReservationFlow();
  const completeSuccess = flow.completeSuccess;
  const meterRefs = useRef(new Map<string, HTMLSpanElement>());
  const mounted = useRef(true);
  const [animationPreparing, setAnimationPreparing] = useState(false);
  const [celebration, setCelebration] =
    useState<CapacityCelebration | null>(null);
  const [transfer, setTransfer] = useState<CapacityTransferPlan | null>(null);
  const formattedUpdate = flow.updatedAt
    ? new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
      }).format(flow.updatedAt)
    : "";

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (flow.stale && !flow.submitting) flow.closeConfirmation();
  }, [flow.closeConfirmation, flow.stale, flow.submitting]);

  const registerMeterRef = useCallback(
    (slotId: string, node: HTMLSpanElement | null) => {
      if (node) meterRefs.current.set(slotId, node);
      else meterRefs.current.delete(slotId);
    },
    [],
  );

  const handleFinalConfirm = async (source: DOMRect) => {
    const selectedSlot = flow.selectedSlot;
    if (!selectedSlot) return;
    const target = meterRefs.current.get(selectedSlot.id);
    if (!target) {
      throw new Error("Reservation capacity meter anchor is unavailable.");
    }
    const result = await flow.submit();
    if (!result) return;

    setAnimationPreparing(true);
    const currentRect = target.getBoundingClientRect();
    const targetIsVisible =
      currentRect.top >= 24 && currentRect.bottom <= window.innerHeight - 24;
    if (!targetIsVisible) {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      target.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "center",
      });
      await new Promise((resolve) =>
        window.setTimeout(resolve, reducedMotion ? 40 : 460),
      );
    }
    if (!mounted.current) return;
    const targetRect = target.getBoundingClientRect();
    setCelebration({
      slotId: result.slot.id,
      previousRemaining: result.slot.remaining,
      ticketCount: result.receipt.ticketCount,
    });
    setTransfer({
      source,
      target: targetRect,
      startProgress:
        (result.slot.capacity - result.slot.remaining) /
        result.slot.capacity,
      targetProgress:
        (result.slot.capacity -
          result.slot.remaining +
          result.receipt.ticketCount) /
        result.slot.capacity,
    });
    setAnimationPreparing(false);
  };

  const completeTransfer = useCallback(() => {
    setTransfer(null);
    setCelebration(null);
    completeSuccess();
  }, [completeSuccess]);

  if (flow.step === "success" && flow.confirmation) {
    return (
      <ReservationSuccessState
        confirmation={flow.confirmation}
        onReset={flow.reset}
      />
    );
  }

  return (
    <div className="reservation-flow">
      <header className="reservation-flow__status">
        <div>
          <span>{copy.statusEyebrow}</span>
          <strong>
            <i aria-hidden="true" />
            {copy.liveStatus}
          </strong>
        </div>
        {flow.updatedAt && !flow.error ? (
          <button
            type="button"
            onClick={() => void flow.refresh()}
            aria-label={copy.refresh}
          >
            <RefreshDouble aria-hidden="true" />
            {copy.lastUpdated(formattedUpdate)}
          </button>
        ) : null}
      </header>

      {flow.stale ? (
        <p className="reservation-stale" role="status">
          <WarningTriangle aria-hidden="true" />
          {copy.staleAvailability}
        </p>
      ) : null}

      <ReservationAvailabilityState
        loading={flow.loading}
        error={flow.error}
        empty={!flow.loading && !flow.error && flow.slots.length === 0}
        onRetry={() => void flow.refresh()}
      />

      {!flow.loading && !flow.error && flow.slots.length > 0 ? (
        <ReservationSelectStep
          instanceId={instanceId}
          slots={flow.slots}
          email={flow.email}
          selectedSlotId={flow.selectedSlotId}
          company={flow.company}
          fieldError={flow.fieldError}
          submitError={flow.confirmationOpen ? null : flow.submitError}
          rejectedSlotIds={flow.rejectedSlotIds}
          celebration={celebration}
          locked={flow.stale || animationPreparing || transfer !== null}
          onEmailChange={flow.updateEmail}
          onSlotChange={flow.selectSlot}
          onCompanyChange={flow.setCompany}
          onContinue={flow.requestConfirmation}
          onMeterRef={registerMeterRef}
        />
      ) : null}

      <ReservationConfirmationDialog
        open={flow.confirmationOpen}
        email={flow.email}
        slot={flow.selectedSlot}
        submitError={flow.submitError}
        submitting={flow.submitting}
        onClose={flow.closeConfirmation}
        onConfirm={(source) => void handleFinalConfirm(source)}
      />

      {transfer ? (
        <ReservationCapacityTransfer
          plan={transfer}
          onComplete={completeTransfer}
        />
      ) : null}
    </div>
  );
}
