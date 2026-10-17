import { scrollToHash } from "../scroll.js";

const LINKS = [
  ["#about", "About"],
  ["#services", "Services"],
  ["#process", "Process"],
  ["#work", "Work"],
  ["#faq", "FAQ"],
  ["#contact", "Contact"],
];

export default function Footer() {
  function go(event, hash) {
    if (scrollToHash(hash)) event.preventDefault();
  }

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <img className="footer-logo" src="/images/logo.png" alt="XCLSV Networks and Solutions" width="240" height="72" />
          <p>Product branding studio in Machakos, Kenya.</p>
        </div>
        <nav aria-label="Footer">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} onClick={(event) => go(event, href)}>
              {label}
            </a>
          ))}
        </nav>
        <address>
          XCLSV Networks &amp; Solutions
          <br />
          P.O Box 46 – 90100 Machakos, Kenya.
          <br />
          <a href="tel:+254726898381">+254 (0) 726 898 381</a>
          <br />
          <a href="tel:+254732211721">+254 (0) 732 211 721</a>
          <br />
          <a href="mailto:xclsvnetworks@outlook.com">xclsvnetworks@outlook.com</a>
        </address>
      </div>
      <p className="legal">© 2026 XCLSV Networks &amp; Solutions.</p>
    </footer>
  );
}
