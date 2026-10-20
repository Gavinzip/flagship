import { useFlagship } from "../FlagshipContext";
import { useEditionPresented } from "../routing/EditionPresentationContext";
import BlurText from "./react-bits/BlurText";

/** One quiet text language for edition titles and scroll-revealed section headings. */
export function EventText({ text, className = "", hero = false, delay = 0 }: {
  text: string; className?: string; hero?: boolean; delay?: number;
}) {
  const presented = useEditionPresented();
  const { paused } = useFlagship();
  const letters = hero || /[\p{Script=Han}\p{Script=Hangul}]/u.test(text);
  return <BlurText as="span" text={text} className={`th-animated-text ${className}`}
    active={presented} disabled={paused} trigger={hero ? "load" : "view"}
    animateBy={letters ? "letters" : "words"} direction="bottom"
    delay={hero ? 30 : letters ? 22 : 70} startDelay={delay}
    stepDuration={.28} threshold={.4} rootMargin="0px 0px -4% 0px"
    animationFrom={{ filter: "blur(8px)", opacity: .12, y: 16 }}
    animationTo={[{ filter: "blur(2px)", opacity: .7, y: -1 }, { filter: "blur(0px)", opacity: 1, y: 0 }]}
    easing={[.22, 1, .36, 1]} />;
}
