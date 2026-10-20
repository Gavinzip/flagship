/** Load the hero's actual font faces without waiting for layout of the hidden event page. */
export async function loadHeroFonts(hero: HTMLElement): Promise<void> {
  const runs = new Map<string, Set<string>>();
  for (const element of hero.querySelectorAll("*")) {
    if (!(element instanceof HTMLElement) || element.children.length) continue;
    const text = element.textContent?.trim();
    if (!text) continue;
    const style = getComputedStyle(element);
    const font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    let glyphs = runs.get(font);
    if (!glyphs) {
      glyphs = new Set<string>();
      runs.set(font, glyphs);
    }
    for (const glyph of text) glyphs.add(glyph);
  }
  await Promise.all(Array.from(runs, ([font, glyphs]) =>
    document.fonts.load(font, Array.from(glyphs).join("")),
  ));
}
