import { scrollToHash } from "../scroll.js";

const POINTS = [
  ["hero__swatch--cyan", "Identity", "Mark, colour, and type that stay the same from handshake to shelf."],
  ["hero__swatch--blue", "Packaging", "Labels and cartons that stay readable in market light."],
  ["hero__swatch--magenta", "Launch kit", "Social, print, and merch that share one set of rules."],
  ["hero__swatch--gold", "Machakos studio", "Workshops at home base. Reviews wherever the team is."],
];

function jump(event, hash) {
  if (scrollToHash(hash)) event.preventDefault();
}

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="hero__pill">Identity · Packaging · Launch</p>
        <div className="hero__card">
          <h1 id="hero-title">Product brands with a spine, shaped for the shelf they sell on.</h1>
          <p className="lede">
            XCLSV Networks &amp; Solutions builds identities, packaging, and launch systems for companies that need to look as considered as they trade.
          </p>
        </div>
        <div className="hero__actions">
          <a className="btn btn--gold" href="#contact" onClick={(event) => jump(event, "#contact")}>
            Get started
          </a>
          <a className="btn btn--line" href="#work" onClick={(event) => jump(event, "#work")}>
            See our work
          </a>
        </div>
      </div>
      <aside className="hero__board" aria-label="Studio board">
        <p className="hero__board-kicker">Studio board</p>
        <ul className="hero__points">
          {POINTS.map(([swatch, title, copy]) => (
            <li key={title}>
              <span className={`hero__swatch ${swatch}`} aria-hidden="true" />
              <div>
                <strong>{title}</strong>
                <span>{copy}</span>
              </div>
            </li>
          ))}
        </ul>
      </aside>
      <p className="hero__foot">A product branding studio in Machakos, Kenya</p>
    </section>
  );
}
