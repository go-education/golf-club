import { useEffect, useRef, useState } from "react";
import { Logo } from "./Icons";
import Mask from "./Mask";

const links = [
  { href: "#collection", label: "New Gear" },
  { href: "#memories", label: "All Clubs" },
  { href: "#connect", label: "Journal" },
  { href: "#about", label: "About" },
];

export default function Header() {
  const headerRef = useRef(null);
  const bagRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
    return () => document.body.classList.remove("nav-open");
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setBagOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!menuOpen && !bagOpen) return undefined;
    const onDown = (event) => {
      if (menuOpen && headerRef.current && !headerRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (bagOpen && bagRef.current && !bagRef.current.contains(event.target)) {
        setBagOpen(false);
      }
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [menuOpen, bagOpen]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 861px)");
    const onChange = () => {
      if (media.matches) setMenuOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const link = headerRef.current?.querySelector(".mobile-panel a");
    link?.focus();
    return undefined;
  }, [menuOpen]);

  const closeMenus = () => {
    setMenuOpen(false);
    setBagOpen(false);
  };

  return (
    <header className="header" id="top" ref={headerRef}>
      <div className="l-wrap header-inner">
        <a className="logo-link" href="#top" aria-label="Golf Club home" onClick={closeMenus}>
          <Logo />
        </a>
        <nav className="header-nav" aria-label="Primary">
          {links.map((link) => (
            <a key={link.label} className="text-link" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-tools">
          <button
            type="button"
            className="text-link menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => {
              setMenuOpen((open) => !open);
              setBagOpen(false);
            }}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
          <div className="bag-wrap" ref={bagRef}>
            <button
              type="button"
              className="text-link"
              aria-expanded={bagOpen}
              aria-controls="bag-panel"
              onClick={() => {
                setBagOpen((open) => !open);
                setMenuOpen(false);
              }}
            >
              Bag (0)
            </button>
            {bagOpen && (
              <div id="bag-panel" className="bag-panel" role="region" aria-label="Your bag">
                <p className="bag-kicker">Your bag</p>
                <p className="bag-copy">
                  Nothing in the bag yet. The new clubs are still on the practice green.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="mobile-panel" id="mobile-menu">
          <nav aria-label="Mobile">
            {links.map((link, index) => (
              <Mask
                key={link.label}
                as="a"
                href={link.href}
                className="mobile-link"
                immediate
                delay={index * 70}
                onClick={closeMenus}
              >
                {link.label}
              </Mask>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
