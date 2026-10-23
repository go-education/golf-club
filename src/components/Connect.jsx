import { useEffect, useState } from "react";
import Mask, { useInView } from "./Mask";
import { Arrow, Play, Spark, Star } from "./Icons";

function useCountUp(active, target, duration = 1100) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return undefined;
    }
    let raf = 0;
    const started = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - started) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

export default function Connect() {
  const [statRef, statIn] = useInView(0.45);
  const score = useCountUp(statIn, 92);
  const [shared, setShared] = useState(false);

  return (
    <section className="connect" id="connect">
      <div className="l-wrap">
        <header className="connect-head">
          <h2>
            <Mask>Where Golfers Connect</Mask>
          </h2>
          <Mask as="p" className="connect-lead" delay={90}>
            Built around the course, the club, and the rounds we share.
          </Mask>
        </header>
        <div className="connect-grid">
          <article className="connect-card connect-journal">
            <span className="pill">The Journal</span>
            <h3 className="journal-title">
              See our
              <span>club notes</span>
            </h3>
            <div className="journal-frame">
              <img
                src="/images/m1.jpg"
                alt="A hand setting a golf ball on a tee in the grass"
                className="journal-photo"
              />
            </div>
            <a className="confidence" href="#memories">
              <span>
                Play With
                <br />
                Confidence
              </span>
              <span className="arrow-btn" aria-hidden="true">
                <Arrow />
              </span>
            </a>
          </article>

          <article className="connect-card connect-feature">
            <img
              src="/images/m4.jpg"
              alt="Golfer seen from behind at the top of a backswing"
              style={{ objectPosition: "center 20%" }}
            />
            <div className="feature-shade" />
            <div className="feature-rate">
              <span>Members Happy</span>
              <strong>
                5.0
                <span className="stars" aria-label="5 out of 5">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} />
                  ))}
                </span>
              </strong>
            </div>
            <a className="view-more feature-more" href="#memories">
              <Play />
              View More
            </a>
            <p className="feature-title">
              Walk The
              <br />
              Fairway.
              <br />
              Start Your
              <br />
              Round
            </p>
            <span className="feature-date">04 / 18</span>
          </article>

          <article className="connect-card connect-membership" ref={statRef}>
            <p className="membership-kicker">Growing Membership</p>
            <div className="avatar membership-avatar">
              <img src="/images/avatar.jpg" alt="" width="64" height="64" />
              <span className="avatar-badge" aria-hidden="true">
                <Spark />
              </span>
            </div>
            <p className="membership-score">{score}%</p>
            <p className="membership-copy">
              Rounds shared by players who walk the course with the club every week.
            </p>
            <button
              type="button"
              className="membership-cta"
              aria-pressed={shared}
              onClick={() => setShared(true)}
            >
              <span>{shared ? "Note received" : "Share a Round"}</span>
              <Arrow />
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
