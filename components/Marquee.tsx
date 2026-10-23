import { marqueeWords } from "@/lib/content";

// Two rows of stack names. Effects.tsx slides them sideways as the page scrolls.
const words = [...marqueeWords, ...marqueeWords, ...marqueeWords];

export function Marquee() {
  return (
    <div className="mqs" aria-hidden="true">
      <div className="mq" data-marquee data-dir="-1">{words.map((w, i) => <span key={i}>{w}</span>)}</div>
      <div className="mq" data-marquee data-dir="1" data-offset="-1600">{words.map((w, i) => <span key={i}>{w}</span>)}</div>
    </div>
  );
}
