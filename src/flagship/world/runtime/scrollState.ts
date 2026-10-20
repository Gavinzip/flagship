export function observeWorldScroll(
  section: HTMLElement,
  update: (progress: number) => void,
) {
  let top = 0,
    distance = 1,
    active = true;
  const read = () => {
    if (active)
      update(Math.max(0, Math.min(1, (window.scrollY - top) / distance)));
  };
  const measure = () => {
    const box = section.getBoundingClientRect();
    top = box.top + window.scrollY;
    distance = Math.max(1, box.height - window.innerHeight);
    read();
  };
  const resize = new ResizeObserver(measure);
  resize.observe(section);
  window.addEventListener("resize", measure);
  window.addEventListener("scroll", read, { passive: true });
  document.fonts.ready.then(measure);
  measure();
  return () => {
    active = false;
    resize.disconnect();
    window.removeEventListener("resize", measure);
    window.removeEventListener("scroll", read);
  };
}
