import { useEffect, useState } from "react";
import { scrollToHash } from "../scroll.js";

const LINKS = [
  ["#about", "About"],
  ["#services", "Services"],
  ["#process", "Process"],
  ["#work", "Work"],
  ["#faq", "FAQ"],
];

export default function Header({ onContact }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape" && open && !document.querySelector("[aria-modal='true']")) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function go(event, hash) {
    if (!scrollToHash(hash)) return;
    event.preventDefault();
    setOpen(false);
  }

  function contact(event) {
    event.preventDefault();
    setOpen(false);
    onContact(event.currentTarget);
  }

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`} id="top">
      <a
        className="brand"
        href="#top"
        aria-label="XCLSV Networks and Solutions, home"
        onClick={(event) => go(event, "#top")}
      >
        <img src="/images/logo.png" alt="XCLSV Networks and Solutions" width="320" height="96" />
      </a>
      <nav className={`nav${open ? " is-open" : ""}`} id="site-nav" aria-label="Primary">
        {LINKS.map(([href, label]) => (
          <a key={href} href={href} onClick={(event) => go(event, href)}>
            {label}
          </a>
        ))}
        <a className="btn btn--gold nav__cta" href="#contact" onClick={contact}>
          Contact us
        </a>
      </nav>
      <a className="btn btn--gold header-cta" href="#contact" onClick={contact}>
        Contact us
      </a>
      <button
        className="nav-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="nav-toggle__bars" aria-hidden="true" />
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>
    </header>
  );
}
