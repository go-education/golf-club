import { useEffect, useRef, useState } from "react";
import { markReady } from "../boot";

const DURATION = 2500;
const HOLD = 420;
const EXIT = 860;

const onesStrip = Array.from({ length: 101 }, (_, index) => index % 10);
const tensStrip = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const hundredsStrip = [0, 1];

function slotEase(t) {
  const brake = 0.74;
  if (t < brake) return (t / brake) * 0.86;
  const u = (t - brake) / (1 - brake);
  return 0.86 + 0.14 * (1 - (1 - u) ** 3);
}

export default function Preloader({ onReady }) {
  const [phase, setPhase] = useState("run");
  const onReadyRef = useRef(onReady);
  const rootRef = useRef(null);
  const onesRef = useRef(null);
  const tensRef = useRef(null);
  const hundredsRef = useRef(null);
  const barRef = useRef(null);
  const valueRef = useRef(null);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let frame = 0;
    let holdTimer = 0;
    let readyTimer = 0;
    let exitTimer = 0;
    let lastTens = -1;
    let lastHundreds = -1;
    let lastSpoken = -1;
    let closed = false;

    const apply = (shown) => {
      const value = Math.min(100, Math.max(0, shown));
      if (onesRef.current) {
        onesRef.current.style.transform = `translate3d(0, ${-value}em, 0)`;
      }

      const tens = Math.min(10, Math.floor(value / 10));
      if (tens !== lastTens && tensRef.current) {
        lastTens = tens;
        tensRef.current.style.transform = `translate3d(0, ${-tens}em, 0)`;
        tensRef.current.parentElement.classList.toggle("is-leading", value < 10);
      }

      const hundreds = Math.min(1, Math.floor(value / 100));
      if (hundreds !== lastHundreds && hundredsRef.current) {
        lastHundreds = hundreds;
        hundredsRef.current.style.transform = `translate3d(0, ${-hundreds}em, 0)`;
        hundredsRef.current.parentElement.classList.toggle("is-leading", value < 100);
      }

      if (barRef.current) barRef.current.style.transform = `scaleX(${value / 100})`;

      const spoken = Math.round(value);
      if (spoken !== lastSpoken) {
        lastSpoken = spoken;
        if (valueRef.current) valueRef.current.textContent = `${spoken}%`;
        rootRef.current?.setAttribute("aria-valuenow", String(spoken));
      }
    };

    const close = () => {
      if (closed) return;
      closed = true;
      markReady();
      onReadyRef.current?.();
      document.body.style.overflow = previousOverflow;
      setPhase("done");
    };

    const leave = () => {
      apply(100);
      setPhase("leaving");
      readyTimer = window.setTimeout(() => {
        markReady();
        onReadyRef.current?.();
      }, reduce ? 0 : 420);
      exitTimer = window.setTimeout(close, reduce ? 40 : EXIT);
    };

    if (reduce) {
      leave();
    } else {
      const started = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - started) / DURATION);
        apply(slotEase(t) * 100);
        if (t < 1) frame = requestAnimationFrame(tick);
        else holdTimer = window.setTimeout(leave, HOLD);
      };
      frame = requestAnimationFrame(tick);
    }

    const safety = window.setTimeout(close, 8000);

    return () => {
      closed = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(holdTimer);
      window.clearTimeout(readyTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(safety);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      ref={rootRef}
      className={`preloader${phase === "leaving" ? " is-leaving" : ""}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      aria-label="Loading"
    >
      <span className="sr-only" ref={valueRef}>
        0%
      </span>
      <div className="preloader-count" aria-hidden="true">
        <span className="reel reel-hundreds is-leading">
          <span className="reel-strip" ref={hundredsRef}>
            {hundredsStrip.map((digit, index) => (
              <span className="reel-digit" key={index}>
                {digit}
              </span>
            ))}
          </span>
        </span>
        <span className="reel reel-tens is-leading">
          <span className="reel-strip" ref={tensRef}>
            {tensStrip.map((digit, index) => (
              <span className="reel-digit" key={index}>
                {digit}
              </span>
            ))}
          </span>
        </span>
        <span className="reel">
          <span className="reel-strip" ref={onesRef}>
            {onesStrip.map((digit, index) => (
              <span className="reel-digit" key={index}>
                {digit}
              </span>
            ))}
          </span>
        </span>
        <span className="preloader-unit">%</span>
      </div>
      <div className="preloader-bar" ref={barRef} />
    </div>
  );
}
