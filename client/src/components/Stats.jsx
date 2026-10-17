import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../scroll.js";

const STATS = [
  ["Services in the studio", 8],
  ["Steps from brief to kit", 5],
  ["Illustrative project types", 8],
  ["Studio, Machakos", 1],
];

function Counter({ label, target }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let frame = 0;
    let started = false;

    function run() {
      if (started) return;
      started = true;
      if (prefersReducedMotion()) {
        setValue(target);
        return;
      }
      const start = performance.now();
      function tick(now) {
        const progress = Math.min(1, (now - start) / 1100);
        setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      }
      frame = requestAnimationFrame(tick);
    }

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      run();
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          run();
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return (
    <div className="counter reveal" ref={ref}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="section section--tight" aria-labelledby="stats-title">
      <div className="wrap">
        <h2 id="stats-title" className="sr-only">
          Studio snapshot
        </h2>
        <dl className="counters">
          {STATS.map(([label, target]) => (
            <Counter key={label} label={label} target={target} />
          ))}
        </dl>
      </div>
    </section>
  );
}
