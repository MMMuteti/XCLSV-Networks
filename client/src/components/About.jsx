import Reveal from "./Reveal.jsx";

export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="wrap about">
        <Reveal>
          <p className="eyebrow">The studio</p>
          <h2 id="about-title">A product branding studio based in Machakos.</h2>
          <p>
            XCLSV works with founders and teams who make things — food, goods, hospitality, trades — and need those things to be recognisable. Machakos is home base. The work is meant to travel: market stalls, retail shelves, and screens.
          </p>
          <p>Every identity is checked in three places before it is called finished: the stall, the shelf, and the phone.</p>
        </Reveal>
        <Reveal as="ul" className="why">
          <li>
            <strong>Practical files.</strong> Artwork a local printer can run.
          </li>
          <li>
            <strong>One system.</strong> Logo, pack, social, and merch share the same rules.
          </li>
          <li>
            <strong>Room to grow.</strong> The next product should not need a new argument.
          </li>
          <li>
            <strong>Close enough to visit.</strong> Workshops in Machakos, reviews wherever the team is.
          </li>
        </Reveal>
      </div>
    </section>
  );
}
