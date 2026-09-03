import { useEffect, useState } from "react";
import {
  getQueueRemainingSeconds,
  type QueueSnapshot,
} from "../../shared/queue/domain";

export function useQueueCountdown(snapshot: QueueSnapshot | null) {
  const expiresAt = snapshot?.expiresAt ?? null;
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const firstTick = Date.now();
    setNow(firstTick);
    if (!expiresAt || Date.parse(expiresAt) <= firstTick) return;

    const timer = window.setInterval(() => {
      const nextNow = Date.now();
      setNow(nextNow);
      if (nextNow >= Date.parse(expiresAt)) window.clearInterval(timer);
    }, 1_000);

    return () => window.clearInterval(timer);
  }, [expiresAt]);

  return snapshot ? getQueueRemainingSeconds(snapshot, now) : null;
}
