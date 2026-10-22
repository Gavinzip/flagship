import bnbChain from "../assets/affiliations/bnb-chain.webp";
import yziLabs from "../assets/affiliations/yzi-labs.webp";

export const organizerAffiliations = {
  chain: { src: bnbChain, name: "BNB Chain", href: "https://www.bnbchain.org/" },
  backer: { src: yziLabs, name: "YZi Labs", href: "https://www.yzilabs.com/" },
} as const;
