export type ImagePreload = {
  src: string;
  srcSet?: string;
  sizes?: string;
};

/** Decode an image before an admission gate reports it as ready to present. */
export function preloadImage({ src, srcSet, sizes }: ImagePreload) {
  return new Promise<void>((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    let settled = false;

    const fail = () => {
      if (settled) return;
      settled = true;
      reject(new Error(`Image could not be loaded: ${src}`));
    };
    const finish = async () => {
      if (settled) return;
      try {
        await image.decode();
      } catch {
        if (!image.naturalWidth) {
          fail();
          return;
        }
      }
      if (settled) return;
      settled = true;
      resolve();
    };

    image.addEventListener("load", () => void finish(), { once: true });
    image.addEventListener("error", fail, { once: true });
    if (srcSet) image.srcset = srcSet;
    if (sizes) image.sizes = sizes;
    image.src = src;

    if (image.complete) {
      if (image.naturalWidth) void finish();
      else fail();
    }
  });
}

export function nextPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}
