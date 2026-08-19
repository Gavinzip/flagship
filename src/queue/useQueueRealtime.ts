import { useCallback, useEffect, useRef, useState } from "react";
import { fetchQueueSnapshot, openQueueSocket } from "./queueApi";
import type { QueueSnapshot } from "../../shared/queue/domain";

export type QueueConnectionStatus = "connecting" | "live" | "offline";

export function useQueueRealtime() {
  const [snapshot, setSnapshot] = useState<QueueSnapshot | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<QueueConnectionStatus>("connecting");
  const latestRevision = useRef(-1);

  const acceptSnapshot = useCallback((next: QueueSnapshot) => {
    if (next.revision < latestRevision.current) return;
    latestRevision.current = next.revision;
    setSnapshot(next);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let disposed = false;
    let socket: WebSocket | null = null;
    let retryTimer: number | null = null;
    let heartbeatTimer: number | null = null;
    let retryCount = 0;

    void fetchQueueSnapshot(controller.signal)
      .then(acceptSnapshot)
      .catch(() => {
        if (!disposed) setConnectionStatus("offline");
      });

    const connect = () => {
      if (disposed) return;
      setConnectionStatus("connecting");
      socket = openQueueSocket(acceptSnapshot);

      socket.addEventListener("open", () => {
        retryCount = 0;
        setConnectionStatus("live");
        heartbeatTimer = window.setInterval(() => {
          if (socket?.readyState === WebSocket.OPEN) socket.send("ping");
        }, 25_000);
      });

      socket.addEventListener("close", () => {
        if (heartbeatTimer !== null) window.clearInterval(heartbeatTimer);
        heartbeatTimer = null;
        if (disposed) return;

        setConnectionStatus("offline");
        const delay = Math.min(1_000 * 2 ** retryCount, 10_000);
        retryCount += 1;
        retryTimer = window.setTimeout(connect, delay);
      });

      socket.addEventListener("error", () => {
        setConnectionStatus("offline");
        socket?.close();
      });
    };

    connect();

    return () => {
      disposed = true;
      controller.abort();
      if (retryTimer !== null) window.clearTimeout(retryTimer);
      if (heartbeatTimer !== null) window.clearInterval(heartbeatTimer);
      socket?.close(1000, "Page closed");
    };
  }, [acceptSnapshot]);

  return { snapshot, connectionStatus, acceptSnapshot };
}
