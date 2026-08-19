import { useMemo } from "react";
import { usePrivatePageMetadata } from "../hooks/usePrivatePageMetadata";
import { useLocale } from "../i18n/LocaleProvider";
import { queueCopy } from "../queue/queueCopy";
import {
  readQueueAdminToken,
  type QueuePageMode,
} from "../queue/queueRoute";
import { useQueueRealtime } from "../queue/useQueueRealtime";
import { QueueAdminPanel } from "./queue/QueueAdminPanel";
import { QueueScreen } from "./queue/QueueScreen";

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
  const {
    snapshot,
    connectionStatus,
    rangeUpdatesSupported,
    acceptSnapshot,
  } = useQueueRealtime();
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
        rangeUpdatesSupported={rangeUpdatesSupported}
        locale={locale}
      />
    </QueueScreen>
  );
}

const QUEUE_PAGE_BY_MODE = {
  admin: AdminQueuePage,
  public: PublicQueuePage,
} satisfies Record<QueuePageMode, () => React.JSX.Element>;

export function QueuePage({ mode }: { mode: QueuePageMode }) {
  const Page = QUEUE_PAGE_BY_MODE[mode];
  return <Page />;
}
