import { scrollToHash } from "../scroll.js";

const POINTS = [
  ["hero__swatch--cyan", "Website Development", "Designing and developing professional business websites."],
  ["hero__swatch--blue", "Payment Integration", "Implementing seamless online payment systems."],
  ["hero__swatch--magenta", "Custom Dashboard Development", "Building dashboards for business monitoring, reporting, and data management."],
  ["hero__swatch--gold", "Business Platform Development", "Creating integrated digital platforms that automate workflows and streamline business operations."],
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
      <aside className="hero__board" aria-label="Product board">
        <p className="hero__board-kicker">Product board</p>
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
