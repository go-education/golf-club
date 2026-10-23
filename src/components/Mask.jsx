import { useEffect, useRef, useState } from "react";
import { whenReady } from "../boot";

export function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

export default function Mask({
  children,
  className = "",
  delay = 0,
  immediate = false,
  as: Tag = "span",
  ...rest
}) {
  const ref = useRef(null);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [on, setOn] = useState(reduce);

  useEffect(() => {
    if (reduce) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    let cancelled = false;
    let raf1 = 0;
    let raf2 = 0;
    let observer;
    let timer = 0;
    let stopBoot = () => {};

    const reveal = () => {
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          if (!cancelled) setOn(true);
        });
      });
    };

    const start = async () => {
      const fontsReady = document.fonts?.ready ?? Promise.resolve();
      await Promise.race([
        fontsReady.catch(() => undefined),
        new Promise((resolve) => {
          timer = setTimeout(resolve, 1200);
        }),
      ]);
      if (cancelled) return;
      if (immediate) {
        await new Promise((resolve) => {
          stopBoot = whenReady(resolve);
        });
        if (!cancelled) reveal();
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            reveal();
            observer.disconnect();
          }
        },
        { threshold: 0.2, rootMargin: "0px 0px -6% 0px" }
      );
      observer.observe(el);
    };

    start();

    return () => {
      cancelled = true;
      stopBoot();
      clearTimeout(timer);
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      observer?.disconnect();
    };
  }, [immediate, reduce]);

  return (
    <Tag
      ref={ref}
      className={`mask${on ? " is-in" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--d": `${delay}ms` }}
      {...rest}
    >
      <span className="mask-inner">{children}</span>
    </Tag>
  );
}
