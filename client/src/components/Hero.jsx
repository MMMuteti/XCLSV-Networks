import { scrollToHash } from "../scroll.js";

const POINTS = [
  { swatch: "hero__swatch--cyan", title: "Website Development", copy: "Designing and developing professional business websites." },
  { swatch: "hero__swatch--blue", title: "Payment Integration", copy: "Implementing seamless online payment systems." },
  { swatch: "hero__swatch--magenta", title: "Custom Dashboard Development", copy: "Building dashboards for business monitoring, reporting, and data management." },
  { swatch: "hero__swatch--gold", title: "Business Platform Development", copy: "Creating integrated digital platforms that automate workflows and streamline business operations." },
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
          {POINTS.map((point) => (
            <li key={point.title}>
              <span className={`hero__swatch ${point.swatch}`} aria-hidden="true" />
              <div>
                <strong>{point.title}</strong>
                <span>{point.copy}</span>
              </div>
            </li>
          ))}
        </ul>
      </aside>
      <p className="hero__foot">A product branding studio in Machakos, Kenya</p>
    </section>
  );
}
