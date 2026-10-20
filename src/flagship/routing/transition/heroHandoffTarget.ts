import type { EditionId } from "../../data/editions";

type HeroHandoffTarget = {
  element: HTMLElement;
  hero: HTMLElement;
  content: HTMLElement | null;
  bounds: () => DOMRect;
};

/** Entry and return share the same explicit target, independent of hero styling. */
export function heroHandoffTarget(edition: EditionId, root: ParentNode = document): HeroHandoffTarget {
  const selector = edition === "taiwan" ? ".hero__logo" : `.fs-hero-artwork[data-edition="${edition}"] .fs-original-emblem`;
  const element = root.querySelector<HTMLElement>(selector);
  const hero = element?.closest("section");
  if (!element || !hero) throw new Error(`The ${edition} hero handoff target is missing.`);
  return {
    element, hero,
    content: element.closest<HTMLElement>(".fs-hero-artwork-inner"),
    bounds: () => element.getBoundingClientRect(),
  };
}
