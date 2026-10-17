import { useState } from "react";
import Reveal from "./Reveal.jsx";

const FILTERS = [
  ["all", "All"],
  ["identity", "Identity"],
  ["packaging", "Packaging"],
  ["campaign", "Campaigns"],
  ["print", "Print & merch"],
];

const WORK = [
  ["packaging", "art-a", "Spice", "Packaging", "Shelf-ready spice range", "Three SKUs, one colour code, labels readable in market light."],
  ["identity", "art-b", "Mark", "Identity", "Fresh-market collective", "A shared mark for crates, receipts, and a Saturday banner."],
  ["identity", "art-c", "Logo", "Logo system", "Sportswear wordmark", "A mark that survives embroidery and a tiny icon."],
  ["campaign", "art-d", "Drop", "Campaign", "Hardware-yard relaunch", "Shutter graphics, price cards, and a two-week social sequence."],
  ["packaging", "art-e", "Pouch", "Packaging", "Highlands coffee pouch", "Origin on the pouch without crowding the roast name."],
  ["print", "art-f", "Stall", "Print & merch", "Festival stall kit", "Backdrop, tee, and price flag from one palette."],
  ["campaign", "art-g", "Social", "Social kit", "Guest-house templates", "Rooms, menus, and weekend offers that match the gate sign."],
  ["identity", "art-h", "Name", "Naming", "Agro range names", "Short names that are easy to say and easy to print on a sack."],
];

export default function Work() {
  const [filter, setFilter] = useState("all");
  const visible = WORK.filter(([cat]) => filter === "all" || cat === filter);

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Illustrative work</p>
        </Reveal>
        <Reveal as="h2" id="work-title">
          Project types, not a client roster.
        </Reveal>
        <Reveal as="p" className="section-lead">
          These cards show the kinds of briefs the studio is built for. They are examples, not named case studies.
        </Reveal>
        <Reveal className="filters" role="toolbar" aria-label="Filter project types">
          {FILTERS.map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={`filter${filter === value ? " is-active" : ""}`}
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </Reveal>
        <div className="work-grid">
          {WORK.map(([cat, art, artLabel, kicker, title, copy]) => {
            const show = filter === "all" || cat === filter;
            return (
              <Reveal as="article" className="work-card" key={title} hidden={!show}>
                <div className={`art ${art}`} aria-hidden="true">
                  {artLabel}
                </div>
                <p className="kicker">{kicker}</p>
                <h3>{title}</h3>
                <p>{copy}</p>
              </Reveal>
            );
          })}
        </div>
        <p id="work-empty" hidden={visible.length > 0}>
          Nothing in this filter.
        </p>
      </div>
    </section>
  );
}
