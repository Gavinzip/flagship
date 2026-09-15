import { staticAssetUrl } from "../lib/staticAssets";

function partnerAssetUrl(filename: string) {
  return staticAssetUrl(`partners/${filename}`);
}

function vendorAssetUrl(filename: string) {
  return partnerAssetUrl(`vendors/${filename}`);
}

export type PartnerLogo = {
  name: string;
  src: string;
  treatment?: "invert-monochrome";
};

export const organizer: PartnerLogo = {
  name: "Renaiss Protocol",
  src: partnerAssetUrl("renaiss-protocol.webp"),
};

export const titleSponsor: PartnerLogo = {
  name: "Vinci World",
  src: partnerAssetUrl("vinci-world.webp"),
};

export const cohost: PartnerLogo = {
  name: "OKX Wallet",
  src: partnerAssetUrl("okx-wallet.webp"),
};

export const vendors: readonly PartnerLogo[] = [
  { name: "CW Card Shop", src: vendorAssetUrl("cw-card-shop.webp") },
  {
    name: "PIKA CRAFT 皮卡社長 TCG",
    src: vendorAssetUrl("pika-craft.webp"),
  },
  {
    name: "C.A.T Card and Treasure",
    src: vendorAssetUrl("cat-card-and-treasure.webp"),
  },
  { name: "寶可樂", src: vendorAssetUrl("baokele.webp") },
  { name: "WENDAO 溫刀卡展", src: vendorAssetUrl("wendao.webp") },
  {
    name: "貓腳印松江店",
    src: vendorAssetUrl("cat-footprint-songjiang.webp"),
  },
  { name: "TCG HOBBY", src: vendorAssetUrl("tcg-hobby.webp") },
  { name: "皇靈王", src: vendorAssetUrl("royal-spirit-king.webp") },
  {
    name: "Card Clinic 卡卡診療室",
    src: vendorAssetUrl("card-clinic.webp"),
  },
  { name: "大師球", src: vendorAssetUrl("master-ball.webp") },
  { name: "Old Man TCG", src: vendorAssetUrl("old-man-tcg.webp") },
  { name: "ALK TCG Store", src: vendorAssetUrl("alk-tcg-store.webp") },
  { name: "鴨鴨道館", src: vendorAssetUrl("duck-dojo.webp") },
  { name: "Cards Hold", src: vendorAssetUrl("cards-hold.webp") },
  {
    name: "Hong Kong Card Store",
    src: vendorAssetUrl("hong-kong-card-store.webp"),
  },
  { name: "對不起我沒錢", src: vendorAssetUrl("sorry-no-money.webp") },
  {
    name: "SJ Card Fanatic",
    src: vendorAssetUrl("sj-card-fanatic.webp"),
  },
  {
    name: "ADM Collectibles",
    src: vendorAssetUrl("adm-collectibles.webp"),
  },
  {
    name: "莉莉艾的皮皮卡丘",
    src: vendorAssetUrl("lillie-clefairy-pikachu.webp"),
  },
  { name: "WL Card All", src: vendorAssetUrl("wl-card-all.webp") },
  { name: "Card Gun", src: vendorAssetUrl("card-gun.webp") },
  { name: "TMax", src: vendorAssetUrl("tmax.webp") },
  { name: "Panwho Cheng", src: vendorAssetUrl("panwho-cheng.webp") },
  { name: "TCGBID", src: vendorAssetUrl("tcgbid.webp") },
  { name: "SUJOBOY", src: vendorAssetUrl("sujoboy.webp") },
  { name: "MagicStar", src: vendorAssetUrl("magicstar.webp") },
  { name: "MAJOR", src: vendorAssetUrl("major.webp") },
  { name: "DOGO", src: vendorAssetUrl("dogo.webp") },
  {
    name: "Cardbase",
    src: vendorAssetUrl("cardbase.webp"),
    treatment: "invert-monochrome",
  },
];
