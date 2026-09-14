import { siteImagePreloads } from "../../config/media";
import { artwork } from "../data/artwork";
import { editions, type EditionId } from "../data/editions";
import { preloadImage } from "./preloadImage";
import { preloadEdition } from "./preloadEdition";

export type EditionPreparation = {
  completed: number;
  total: number;
  progress: number;
  status: "loading" | "ready" | "error";
};

type PreparationRecord = {
  snapshot: EditionPreparation;
  promise: Promise<void>;
  listeners: Set<(snapshot: EditionPreparation) => void>;
};

const records = new Map<EditionId, PreparationRecord>();

function criticalImages(edition: EditionId) {
  if (edition === "taiwan") return siteImagePreloads;

  return [
    { src: editions.korea.emblem },
    { src: artwork.scrollSky2k },
    { src: artwork.scrollCity2k },
    { src: artwork.scrollGround2k },
  ];
}

function publish(record: PreparationRecord) {
  record.listeners.forEach((listener) => listener(record.snapshot));
}

function createPreparation(edition: EditionId): PreparationRecord {
  const images = criticalImages(edition);
  const tasks = [
    () => preloadEdition(),
    () => document.fonts.ready,
    ...images.map((image) => () => preloadImage(image)),
  ];
  const record: PreparationRecord = {
    snapshot: {
      completed: 0,
      total: tasks.length,
      progress: 0,
      status: "loading",
    },
    promise: Promise.resolve(),
    listeners: new Set(),
  };

  record.promise = Promise.all(
    tasks.map(async (prepare) => {
      await prepare();
      record.snapshot = {
        ...record.snapshot,
        completed: record.snapshot.completed + 1,
        progress: Math.min(
          99,
          Math.round(
            ((record.snapshot.completed + 1) / record.snapshot.total) * 99,
          ),
        ),
      };
      publish(record);
    }),
  )
    .then(() => {
      record.snapshot = {
        ...record.snapshot,
        completed: record.snapshot.total,
        progress: 100,
        status: "ready",
      };
      publish(record);
    })
    .catch((error) => {
      record.snapshot = { ...record.snapshot, status: "error" };
      publish(record);
      records.delete(edition);
      throw error;
    });

  return record;
}

function getPreparation(edition: EditionId) {
  let record = records.get(edition);
  if (!record) {
    record = createPreparation(edition);
    records.set(edition, record);
  }
  return record;
}

/** Start loading an event route while the globe remains interactive. */
export function warmEdition(edition: EditionId) {
  return getPreparation(edition).promise;
}

/** Subscribe to real route/module/font/image completion while an entry is held. */
export function observeEditionPreparation(
  edition: EditionId,
  listener: (snapshot: EditionPreparation) => void,
) {
  const record = getPreparation(edition);
  record.listeners.add(listener);
  listener(record.snapshot);
  return {
    promise: record.promise,
    stop: () => record.listeners.delete(listener),
  };
}
