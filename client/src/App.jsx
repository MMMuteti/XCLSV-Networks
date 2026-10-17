import { scrollToHash } from "./scroll.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Process from "./components/Process.jsx";
import Work from "./components/Work.jsx";
import Stats from "./components/Stats.jsx";
import Faq from "./components/Faq.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Services />
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
      <Footer />
    </>
  );
}
