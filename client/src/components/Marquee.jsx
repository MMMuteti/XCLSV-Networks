const ITEMS = [
  "Brand identity",
  "Packaging",
  "Logo systems",
  "Brand guidelines",
  "Social kits",
  "Print & merch",
  "Naming",
  "Launch campaigns",
];

export default function Marquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
