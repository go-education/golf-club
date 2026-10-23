import { useEffect, useState } from "react";
import Mask from "./Mask";
import { Logo, Spark } from "./Icons";
import { whenReady } from "../boot";

function useCountUp(target, delay, duration) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf = 0;
    let timeout = 0;
    const stop = whenReady(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        setValue(target);
        return;
      }
      timeout = setTimeout(() => {
        const started = performance.now();
        const tick = (now) => {
          const progress = Math.min(1, (now - started) / duration);
          const eased = 1 - (1 - progress) ** 3;
          setValue(Math.round(eased * target));
          if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }, delay);
    });
    return () => {
      stop();
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [target, delay, duration]);

  return value;
}

export default function Hero() {
  const score = useCountUp(98, 820, 1100);

  return (
    <section className="hero" aria-label="Golf Club">
      <div className="hero-frame">
        <img
          src="/images/hero.jpg"
          alt="Golfer in a lime shirt finishing a swing on a wide green fairway"
          fetchPriority="high"
        />
      </div>
      <div className="hero-shade" />
      <div className="hero-content">
        <span className="copy-mark" aria-hidden="true">
          ©
        </span>
        <article className="stat-card">
          <div className="stat-top">
            <Logo className="logo logo-sm" />
          </div>
          <p className="stat-title">
            Fairway
            <br />
            Focus
          </p>
          <p className="stat-copy">Course-focused design from a new — collaboration.</p>
          <p className="stat-value">{score}%</p>
        </article>
        <div className="hero-bottom">
          <h1 className="hero-title">
            <Mask className="word" delay={420} immediate>
              Golf
            </Mask>
            <span className="title-tail">
              <Mask className="word" delay={580} immediate>
                Club
              </Mask>
              <Spark className="spark spark-in" />
            </span>
          </h1>
          <p className="kicker">
            <Mask immediate delay={700}>
              Premium quality
            </Mask>
            <Mask immediate delay={840}>
              Crafted for the course
            </Mask>
          </p>
        </div>
      </div>
    </section>
  );
}
