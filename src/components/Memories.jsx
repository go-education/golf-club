import { useState } from "react";
import Mask, { useInView } from "./Mask";
import { Play, Spark } from "./Icons";
import { memories } from "../data";

export default function Memories() {
  const [active, setActive] = useState("fairway-hour");
  const [expanded, setExpanded] = useState(false);
  const [stripRef, stripIn] = useInView(0.18);

  const selectMemory = (id, event) => {
    setActive(id);
    const strip = stripRef.current;
    const card = event.currentTarget.closest("figure");
    if (!strip || !card || expanded) return;
    const stripRect = strip.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const outOfView = cardRect.left < stripRect.left + 12 || cardRect.right > stripRect.right - 12;
    if (!outOfView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delta = cardRect.left - stripRect.left - (stripRect.width - cardRect.width) / 2;
    strip.scrollBy({ left: delta, behavior: reduce ? "auto" : "smooth" });
  };

  const onStripKey = (event) => {
    const strip = stripRef.current;
    if (!strip || expanded) return;
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const direction = event.key === "ArrowRight" ? 1 : -1;
    strip.scrollBy({ left: direction * 280, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section className="memories" id="memories">
      <div className="l-wrap mem-head">
        <h2>
          <Mask>The Memories</Mask>
        </h2>
        <button
          type="button"
          className="pill"
          aria-expanded={expanded}
          onClick={() => setExpanded((open) => !open)}
        >
          {expanded ? "Show less" : "View all memories"}
        </button>
      </div>
      <div
        ref={stripRef}
        className={`strip${stripIn ? " is-in" : ""}${expanded ? " is-expanded" : ""}`}
        tabIndex={0}
        role="group"
        aria-label="Golf memories. Use arrow keys to scroll."
        onKeyDown={onStripKey}
      >
        {memories.map((item) => {
          const selected = item.id === active;
          return (
            <figure key={item.id} className={`memory${selected ? " is-active" : ""}`}>
              <button
                type="button"
                className="photo"
                aria-pressed={selected}
                aria-label={item.title}
                onClick={(event) => selectMemory(item.id, event)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  style={{ objectPosition: item.position }}
                  loading="lazy"
                />
                {selected && (
                  <span className="photo-meta">
                    <Mask delay={60}>
                      <span className="view-more">
                        <Play />
                        View More
                      </span>
                    </Mask>
                    <Mask delay={150}>
                      <span className="photo-name">
                        <Spark />
                        {item.title}
                      </span>
                    </Mask>
                  </span>
                )}
              </button>
              {selected && (
                <figcaption className="caption">
                  <Mask key={item.id}>{item.caption}</Mask>
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>
    </section>
  );
}
