import { useState } from "react";
import Reveal from "./Reveal.jsx";

const STEPS = [
  ["01 Brief", "Start with the product", "We look at what you sell, the price, and the places it is bought. A stall and a supermarket ask different things of the same brand."],
  ["02 Direction", "Place it in the market", "Who it is for, what it should be called, and which neighbouring brands it must not resemble. Positioning comes before decoration."],
  ["03 System", "Build the system", "Logo, colour, type, and a short line. You see options on a label, a shutter, and a phone — not only on a white artboard."],
  ["04 Make", "Apply it", "Packaging, social templates, print, and merch come from the same rules so a new teammate can extend the brand."],
  ["05 Handover", "Hand over the kit", "Guidelines, files, and a simple campaign sequence. You leave with something the team can run."],
];

export default function Process() {
  const [active, setActive] = useState(0);

  function onKey(event, index) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next =
      event.key === "ArrowRight" ? (index + 1) % STEPS.length : (index - 1 + STEPS.length) % STEPS.length;
    setActive(next);
    document.getElementById(`step-tab-${next + 1}`)?.focus();
  }

  return (
    <section className="section" id="process" aria-labelledby="process-title">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Process</p>
        </Reveal>
        <Reveal as="h2" id="process-title">
          From a conversation to a launch kit.
        </Reveal>
        <Reveal className="stepper" role="tablist" aria-label="Branding process">
          {STEPS.map(([label], index) => (
            <button
              key={label}
              className="step"
              type="button"
              role="tab"
              id={`step-tab-${index + 1}`}
              aria-selected={active === index}
              aria-controls={`step-${index + 1}`}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKey(event, index)}
            >
              {label}
            </button>
          ))}
        </Reveal>
        {STEPS.map(([, title, copy], index) => (
          <div
            key={title}
            className="step-panel"
            id={`step-${index + 1}`}
            role="tabpanel"
            aria-labelledby={`step-tab-${index + 1}`}
            hidden={active !== index}
          >
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
