import Reveal from "./Reveal.jsx";

const PRODUCTS = [
  {
    image: "/images/payment-integration.png",
    alt: "A phone showing a Visa card held next to a contactless payment terminal",
    title: "Payment Integration",
    subtitle: "Make getting paid simpler",
    points: [
      "Connect customers to convenient digital payment options.",
      "Generate instant transaction acknowledgements.",
      "Simplify payment tracking and reconciliation.",
    ],
  },
  {
    image: "/images/custom-dashboard.png",
    alt: "Hands typing on a laptop that shows charts and a business dashboard",
    title: "Custom Dashboard Development",
    subtitle: "Turn business data into clear decisions",
    points: [
      "Track key performance indicators from one interface.",
      "Transform complex data into actionable insights.",
      "Monitor business performance with visual reports.",
    ],
  },
  {
    image: "/images/website-development.png",
    alt: "A hand pointing at a web development diagram with code, cloud, and server icons",
    title: "Website Development",
    subtitle: "Build a digital presence that delivers",
    points: [
      "Create engaging experiences tailored to your audience.",
      "Improve discoverability across search engines.",
      "Guide visitors towards meaningful business actions.",
    ],
  },
  {
    image: "/images/business-platform.jpg",
    alt: "A team reviewing charts and a tablet during a business meeting",
    title: "Business Platform Development",
    subtitle: "Bring your entire operation together",
    points: [
      "Connect business processes in one unified platform.",
      "Automate repetitive tasks and routine workflows.",
      "Manage customers, operations, and records seamlessly.",
    ],
  },
];

export default function Products() {
  return (
    <section className="section products" id="products" aria-labelledby="products-title">
      <div className="wrap">
        <h2 id="products-title" className="sr-only">
          Products
        </h2>
        <div className="product-row">
          {PRODUCTS.map((product) => (
            <Reveal as="article" className="product-card" key={product.title}>
              <img src={product.image} alt={product.alt} />
              <h3>{product.title}</h3>
              <p>{product.subtitle}</p>
              <ul>
                {product.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
