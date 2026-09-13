import { MetalBorder } from "../ui/MetalBorder";
import { useContext, useEffect, useRef, useState, type RefObject } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "iconoir-react";
import { useSiteNavigation } from "../../routing/SiteNavigation";
import { EditionTransitionContext } from "../../routing/transition/EditionTransitionContext";
import { homeMedia } from "../homeMedia";
import { homeMotion } from "../motion/homeMotion";
import { homeSections, type HomeSectionId } from "./homeSections";
import { useHomeNavigation } from "./useHomeNavigation";

/** Pill Nav motion adapted to this site's existing Motion and native anchor navigation. */
export function BrandPillHeader({ site }: { site: RefObject<HTMLDivElement | null> }) {
  const { location } = useSiteNavigation();
  const { visible: scrolled, active } = useHomeNavigation(site);
  const transferring = useContext(EditionTransitionContext)?.retainingWorld;
  const visible = scrolled && !transferring;
  const reduced = useReducedMotion();
  const items = homeSections(location.language);
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const zh = location.language === "zh-TW", ko = location.language === "ko";
  const label = zh ? "FLAGSHIP 主站導覽" : ko ? "FLAGSHIP 탐색" : "FLAGSHIP navigation";
  useEffect(() => { if (!visible) setOpen(false); }, [visible]);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) setOpen(false); };
    const desktop = window.matchMedia("(min-width: 801px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("pointerdown", outside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => { document.removeEventListener("pointerdown", outside); desktop.removeEventListener("change", closeOnDesktop); };
  }, [open]);
  const closeMenu = () => setOpen(false);
  const link = (item: { id: HomeSectionId; label: string }, mobile = false) => <a
    key={item.id} href={`#${item.id}`} className="ip-pill-link ip-metal-control" aria-current={active === item.id ? "location" : undefined}
    onClick={closeMenu}
  >
    <MetalBorder />
    {!mobile && active === item.id && <motion.span className="ip-pill-selected" layoutId="ip-selected-section" transition={reduced ? { duration: 0 } : homeMotion.selection} />}
    <span className="ip-pill-label"><span>{item.label}</span><span aria-hidden="true">{item.label}</span></span>
    {mobile && <ArrowUpRight aria-hidden="true" />}
  </a>;
  return <motion.header ref={header} className="ip-pill-header" data-visible={visible} data-open={open}
    inert={!visible} aria-hidden={!visible} initial={false}
    animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : reduced ? 0 : -22 }}
    transition={{ duration: reduced ? 0 : visible ? 0.4 : 0.22, ease: homeMotion.ease }}
    onKeyDown={event => { if (event.key === "Escape" && open) { event.preventDefault(); setOpen(false); trigger.current?.focus(); } }}
    onBlurCapture={event => { if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false); }}
  >
    <div className="ip-pill-bar">
      <a className="ip-pill-brand ip-metal-control" href="#editions" onClick={closeMenu} aria-label={zh ? "返回 FLAGSHIP 地球" : ko ? "FLAGSHIP 지구로" : "Back to the FLAGSHIP globe"}>
        <MetalBorder /><img src={homeMedia.masterLogo} alt="FLAGSHIP Card Show" width="1670" height="941" />
      </a>
      <LayoutGroup id="ip-navigation"><nav className="ip-pill-desktop" aria-label={label}>{items.map(item => link(item))}</nav></LayoutGroup>
      <span className="ip-pill-current">{items.find(item => item.id === active)?.label}</span>
      <button className="ip-pill-toggle ip-metal-control" ref={trigger} aria-expanded={open} aria-controls="ip-mobile-links"
        aria-label={open ? (zh ? "關閉導覽" : ko ? "메뉴 닫기" : "Close navigation") : (zh ? "開啟導覽" : ko ? "메뉴 열기" : "Open navigation")}
        onClick={() => setOpen(value => !value)}><MetalBorder /><span /><span /></button>
    </div>
    <AnimatePresence initial={false}>{open && <motion.div className="ip-pill-mobile" id="ip-mobile-links"
      initial={{ height: 0, opacity: 0, y: reduced ? 0 : -8 }} animate={{ height: "auto", opacity: 1, y: 0 }} exit={{ height: 0, opacity: 0, y: reduced ? 0 : -8 }}
      transition={{ duration: reduced ? 0 : 0.28, ease: homeMotion.ease }}>
      <nav aria-label={label}>{items.map(item => link(item, true))}</nav>
    </motion.div>}</AnimatePresence>
  </motion.header>;
}
