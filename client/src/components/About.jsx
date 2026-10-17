import Reveal from "./Reveal.jsx";

export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="wrap about">
        <Reveal>
          <h2 id="about-title">About Us</h2>
          <p>
            At XCLSV Network &amp; Solutions, we help businesses establish a strong online presence and streamline their operations through innovative digital solutions. From professional website development and seamless payment integrations to custom dashboards and business platforms, we build tools that simplify workflows, improve efficiency, and support business growth.
          </p>
          <p>Our goal is to bring everything your business needs into one connected, easy-to-manage system.</p>
        </Reveal>
      </div>
    </section>
  );
}
