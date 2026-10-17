import Reveal from "./Reveal.jsx";

const SERVICES = [
  ["01", "Brand identity", "Positioning, voice, colour, and type that hold from the first handshake to the shelf."],
  ["02", "Packaging", "Labels, cartons, and closures that stay readable in market light and on a retail rail."],
  ["03", "Logo systems", "A primary mark, a compact mark, and rules for embroidery, stamps, and tiny icons."],
  ["04", "Brand guidelines", "A short book your printer, designer, and social manager can follow without a meeting."],
  ["05", "Social kits", "Templates for product drops, market days, and stories so the feed matches the pack."],
  ["06", "Print & merch", "Posters, price cards, uniforms, totes, and stalls that still feel like the same brand."],
  ["07", "Naming", "Product and range names that are easy to say at a counter and easy to print."],
  ["08", "Launch campaigns", "A sequenced drop: teaser, pack reveal, market activation, and the assets to run it."],
];

export default function Services() {
  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Services</p>
        </Reveal>
        <Reveal as="h2" id="services-title">
          Eight ways a product becomes recognisable.
        </Reveal>
        <div className="card-grid">
          {SERVICES.map(([num, title, copy]) => (
            <Reveal as="article" className="card" key={num}>
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
