import { staticAssetUrl } from "../../lib/staticAssets";
import masterLogo from "../assets/brand/flagship-master.webp";
const crowd = staticAssetUrl("flagship/brand-crowd-hero.webp");
const story = staticAssetUrl("flagship/brand-story-collectors.webp");
const exchange = staticAssetUrl("flagship/brand-trade-cards.webp");
const play = staticAssetUrl("flagship/brand-play-table.webp");
const collect = staticAssetUrl("flagship/brand-collect-slabs.webp");
const connect = staticAssetUrl("flagship/brand-connect-collectors.webp");
const recapPoster = staticAssetUrl("flagship/taiwan-2026-official-recap-poster.webp");

/** Optimized derivatives of the actual Taiwan 2026 event photographs. */
export const homeMedia = { masterLogo, crowd, story, exchange, play, collect, connect, recapPoster };
