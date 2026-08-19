import { useEffect, useMemo } from "react";
import { usePrivatePageMetadata } from "../hooks/usePrivatePageMetadata";
import { useLocale } from "../i18n/LocaleProvider";
import { queueCopy } from "../queue/queueCopy";
import {
  JOIN_QUEUE_PATH,
  readQueueAdminToken,
  readQueueJoinToken,
  type QueuePageMode,
} from "../queue/queueRoute";
import { useQueueRealtime } from "../queue/useQueueRealtime";
import { useQueueTicket } from "../queue/useQueueTicket";
import { QueueAdminPanel } from "./queue/QueueAdminPanel";
import { QueueQrPanel } from "./queue/QueueQrPanel";
import { QueueScreen } from "./queue/QueueScreen";
import { QueueTicketPanel } from "./queue/QueueTicketPanel";

function PublicQueuePage() {
  const { locale } = useLocale();
  const content = queueCopy[locale];
  const { snapshot, connectionStatus } = useQueueRealtime();

  usePrivatePageMetadata(
    `${content.publicTitle}｜FLAGSHIP Card Show Taiwan`,
  );

  return (
    <QueueScreen
      connectionStatus={connectionStatus}
      headerLabel="LIVE QUEUE"
      locale={locale}
      snapshot={snapshot}
      variant="public"
    />
  );
}

function AdminQueuePage() {
  const { locale } = useLocale();
  const content = queueCopy[locale];
  const { snapshot, connectionStatus, acceptSnapshot } = useQueueRealtime();
  const adminToken = useMemo(
    () => readQueueAdminToken(window.location.hash),
    [],
  );

  usePrivatePageMetadata(
    `${content.adminTitle}｜FLAGSHIP Card Show Taiwan`,
  );

  return (
    <QueueScreen
      connectionStatus={connectionStatus}
      footer={
        <a className="queue-public-link" href="/now-serving">
          {content.backToDisplay} <span aria-hidden="true">↗</span>
        </a>
      }
      headerLabel="CONTROL DESK"
      locale={locale}
      snapshot={snapshot}
      variant="admin"
    >
      <QueueAdminPanel
        adminToken={adminToken}
        snapshot={snapshot}
        onSnapshot={acceptSnapshot}
        locale={locale}
      />
    </QueueScreen>
  );
}

function JoinQueuePage() {
  const { locale } = useLocale();
  const content = queueCopy[locale];
  const { snapshot, connectionStatus } = useQueueRealtime();
  const joinToken = useMemo(
    () => readQueueJoinToken(window.location.hash),
    [],
  );
  const { ticket, status, errorCode, retry } = useQueueTicket({
    joinToken,
  });

  usePrivatePageMetadata(
    `${content.joinTitle}｜FLAGSHIP Card Show Taiwan`,
  );

  useEffect(() => {
    if (status === "ready" && window.location.hash) {
      window.history.replaceState(null, "", JOIN_QUEUE_PATH);
    }
  }, [status]);

  return (
    <QueueScreen
      connectionStatus={connectionStatus}
      headerLabel="GET QUEUE NUMBER"
      locale={locale}
      snapshot={snapshot}
      variant="join"
    >
      <QueueTicketPanel
        errorCode={errorCode}
        locale={locale}
        onRetry={retry}
        status={status}
        ticket={ticket}
      />
    </QueueScreen>
  );
}

function QueueQrPage() {
  const { locale } = useLocale();
  const content = queueCopy[locale];
  const { snapshot, connectionStatus } = useQueueRealtime();
  const joinToken = useMemo(
    () => readQueueJoinToken(window.location.hash),
    [],
  );

  usePrivatePageMetadata(`${content.qrTitle}｜FLAGSHIP Card Show Taiwan`);

  return (
    <QueueScreen
      connectionStatus={connectionStatus}
      footer={
        <a className="queue-public-link" href="/now-serving">
          {content.backToDisplay} <span aria-hidden="true">↗</span>
        </a>
      }
      headerLabel="VENUE QR DISPLAY"
      locale={locale}
      snapshot={snapshot}
      variant="qr"
    >
      <QueueQrPanel joinToken={joinToken} locale={locale} />
    </QueueScreen>
  );
}

const QUEUE_PAGE_BY_MODE = {
  admin: AdminQueuePage,
  join: JoinQueuePage,
  public: PublicQueuePage,
  qr: QueueQrPage,
} satisfies Record<QueuePageMode, () => React.JSX.Element>;

export function QueuePage({ mode }: { mode: QueuePageMode }) {
  const Page = QUEUE_PAGE_BY_MODE[mode];
  return <Page />;
}
