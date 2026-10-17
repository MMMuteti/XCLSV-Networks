import { useState } from "react";
import Reveal from "./Reveal.jsx";

const ITEMS = [
  ["faq-1", "Do you only work in Machakos?", "The studio is in Machakos. Brands often sell across Kenya. Workshops can be in person or remote."],
  ["faq-2", "Can you brand one product, or only a whole company?", "Both. A single product still needs a name, a pack, and a way to talk about it."],
  ["faq-3", "What do we receive?", "Logo files, colour and type rules, agreed packaging artwork, social templates, and a short guideline."],
  ["faq-4", "Do you print the packaging?", "We design and prepare files, and we can coordinate with a printer you trust. Production stays with a print partner."],
];

export default function Faq() {
  const [open, setOpen] = useState("");

  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">FAQ</p>
        </Reveal>
        <Reveal as="h2" id="faq-title">
          Before we start.
        </Reveal>
        <Reveal className="accordion">
          {ITEMS.map(([id, question, answer]) => {
            const expanded = open === id;
            return (
              <div key={id}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={id}
                    id={`${id}-btn`}
                    onClick={() => setOpen(expanded ? "" : id)}
                  >
                    {question}
                  </button>
                </h3>
                <div id={id} role="region" aria-labelledby={`${id}-btn`} hidden={!expanded}>
                  <p>{answer}</p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
