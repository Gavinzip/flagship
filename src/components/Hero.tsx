import { HeroArena } from "./HeroArena";
import { HeroHandCover } from "./HeroHandCover";

export function Hero() {
  const cover = new URLSearchParams(window.location.search).get("cover");

  return cover === "arena" ? <HeroArena /> : <HeroHandCover />;
}
