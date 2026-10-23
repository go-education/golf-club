import { useEffect, useState } from "react";
import Mask, { useInView } from "./Mask";
import { Logo, Play, Spark } from "./Icons";

const tags = ["Clubs", "Irons", "Fairway", "Apparel", "Gloves", "Practice", "Course", "18"];

function useCountUp(active, target, duration = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return undefined;
    }
    let frame = 0;
    const started = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - started) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}

export default function Series() {
  const [cardRef, cardIn] = useInView(0.4);
  const score = useCountUp(cardIn, 100);
  const [tag, setTag] = useState("Fairway");

  return (
    <section className="series" id="series">
      <div className="l-wrap series-grid">
        <figure className="series-photo">
          <img
            className="series-main"
            src="/images/c-swing.jpg"
            alt="Golfer in light trousers finishing a swing, the ball just leaving the club"
            style={{ objectPosition: "22% 38%" }}
          />
          <article className="series-card" ref={cardRef}>
            <Logo className="logo series-logo" />
            <h3>
              Round
              <br />
              Series
            </h3>
            <p>Designed to play the course with a quieter swing.</p>
            <p className="series-stat">
              {score}
              <span>+</span>
            </p>
          </article>
          <span className="series-since">Since 1997</span>
        </figure>

        <div className="series-copy">
          <p className="series-kicker">
            <span className="collection-dot" aria-hidden="true" />
            Golf Club × Amelia Cho
          </p>
          <h2>
            <Mask>Where Craft</Mask>
            <Mask delay={90}>Meets the Course</Mask>
          </h2>
          <Mask as="p" className="series-lead" delay={140}>
            Our latest collaboration is built for a full round: a quieter swing, and gear that stays with you from the first tee.
          </Mask>
          <div className="series-tags" role="group" aria-label="Round series">
            {tags.map((item) => (
              <button
                key={item}
                type="button"
                className="pill"
                aria-pressed={tag === item}
                onClick={() => setTag(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="series-foot">
            <p className="series-mark">
              <Spark />
              <span>
                Designed
                <br />
                to play
                <br />
                with you
              </span>
            </p>
            <a className="series-circle" href="#memories">
              <img
                src="/images/m3.jpg"
                alt=""
                style={{ objectPosition: "center 70%" }}
              />
              <span className="view-more">
                <Play />
                View More
              </span>
            </a>
            <img
              className="series-still"
              src="/images/m6.jpg"
              alt="Sunrise across a tree-lined fairway with mountains beyond"
              style={{ objectPosition: "center 55%" }}
            />
            <p className="series-aside">A round shaped around how you play.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
