import { useCallback, useRef, useState } from "react";
import { scrollToHash } from "./scroll.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Products from "./components/Products.jsx";
import Process from "./components/Process.jsx";
import Work from "./components/Work.jsx";
import Stats from "./components/Stats.jsx";
import Faq from "./components/Faq.jsx";
import Contact from "./components/Contact.jsx";
import ContactModal from "./components/ContactModal.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const contactOpener = useRef(null);
  const closeContact = useCallback(() => setContactOpen(false), []);

  function openContact(trigger) {
    contactOpener.current = trigger || null;
    setContactOpen(true);
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header onContact={openContact} />
      <main id="main">
        <div className="first-screen">
          <Hero />
          <Marquee />
        </div>
        <About />
        <Services />
        <Products />
        <Process />
        <Work />
        <Stats />
        <Faq />
        <section className="cta" aria-labelledby="cta-title">
          <div className="wrap reveal is-in">
            <h2 id="cta-title">Bring the product. Leave with a brand that can travel.</h2>
            <a
              className="btn btn--gold"
              href="#contact"
              onClick={(event) => {
                if (scrollToHash("#contact")) event.preventDefault();
              }}
            >
              Start a brand
            </a>
          </div>
        </section>
        <Contact />
      </main>
      <Footer onContact={openContact} />
      {contactOpen && <ContactModal openerRef={contactOpener} onClose={closeContact} />}
    </>
  );
}
