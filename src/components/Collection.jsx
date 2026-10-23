import { useState } from "react";
import { collection } from "../data";
import Mask from "./Mask";
import { Arrow } from "./Icons";

export default function Collection() {
  const [activeId, setActiveId] = useState(collection[0].id);
  const active = collection.find((item) => item.id === activeId) ?? collection[0];

  const move = (direction) => {
    const index = collection.findIndex((item) => item.id === activeId);
    const next = collection[(index + direction + collection.length) % collection.length];
    setActiveId(next.id);
    document.getElementById(`collection-${next.id}`)?.focus();
  };

  return (
    <section className="collection" id="collection">
      <div className="l-wrap">
        <div className="collection-frame">
          {collection.map((item) => (
            <img
              key={item.id}
              className={`collection-photo${item.id === active.id ? " is-active" : ""}`}
              src={item.src}
              alt={item.id === active.id ? item.alt : ""}
              style={{ objectPosition: item.position }}
              aria-hidden={item.id === active.id ? undefined : true}
            />
          ))}
          <div className="collection-shade" />
          <div className="collection-layout">
            <div className="collection-top">
              <p className="collection-kicker">
                <span className="collection-dot" aria-hidden="true" />
                Course Collection
              </p>
              <h2>
                <Mask>Course Essentials</Mask>
              </h2>
            </div>
            <div className="collection-bottom">
              <p className="collection-note" key={active.id}>
                {active.note}
              </p>
              <div
                className="collection-menu"
                role="listbox"
                aria-label="Course collection"
                aria-activedescendant={`collection-${active.id}`}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                    event.preventDefault();
                    move(1);
                  }
                  if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                    event.preventDefault();
                    move(-1);
                  }
                }}
              >
                {collection.map((item) => {
                  const selected = item.id === active.id;
                  return (
                    <button
                      key={item.id}
                      id={`collection-${item.id}`}
                      type="button"
                      role="option"
                      className={`collection-link${selected ? " is-active" : ""}`}
                      aria-selected={selected}
                      onPointerEnter={() => setActiveId(item.id)}
                      onFocus={() => setActiveId(item.id)}
                    >
                      <span>{item.label}</span>
                      <Arrow />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
