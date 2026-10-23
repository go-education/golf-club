import { useState } from "react";
import Mask from "./Mask";
import { Arrow } from "./Icons";

const links = [
  { href: "#top", label: "Home" },
  { href: "#collection", label: "The Collection" },
  { href: "#memories", label: "Memories" },
  { href: "#connect", label: "Journal" },
  { href: "#footer-talk", label: "Contact" },
];

const notes = {
  terms: "Play the course as you find it. The club keeps the round, not the noise around it.",
  privacy: "A note you leave stays with the club. It is not passed on, sold, or filed anywhere else.",
};

export default function Footer() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [policy, setPolicy] = useState(null);

  const choosePolicy = (next) => {
    setPolicy((current) => (current === next ? null : next));
  };

  return (
    <footer className="footer" id="footer">
      <div className="l-wrap">
        <div className="footer-grid">
          <p className="footer-aside">
            <Mask>Where golfers come together to play the round and stay for the next one.</Mask>
          </p>
          <div className="footer-lead">
            <h2 className="footer-title">
              <Mask>Walk the Course.</Mask>
              <Mask delay={90}>
                <span className="footer-under">Start Here</span>
              </Mask>
            </h2>
            <button
              id="footer-talk"
              type="button"
              className="footer-cta"
              aria-expanded={open}
              aria-pressed={sent}
              onClick={() => {
                if (!sent) setOpen((value) => !value);
              }}
            >
              <span>{sent ? "Note received" : "Start a Conversation"}</span>
              <Arrow />
            </button>
            {open && !sent ? (
              <form
                className="footer-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSent(true);
                  setOpen(false);
                }}
              >
                <label className="sr-only" htmlFor="footer-note">
                  Your note to the club
                </label>
                <input id="footer-note" name="note" required placeholder="The round you have in mind" />
                <button type="submit">Send</button>
              </form>
            ) : null}
          </div>

          <div className="footer-statement">
            <p>Built for a full round, from the first tee to the walk in.</p>
            <p className="footer-quiet">Designed around the swing, the course, and the hours between shots.</p>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            {links.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="footer-club">
            <p>The Clubhouse</p>
            <p className="footer-quiet">
              Practice green to the last green.
              <br />
              Open with the light. Closed when the course is.
            </p>
          </div>
        </div>

        <div className="footer-mark-wrap">
          <p className="footer-mark" aria-hidden="true">Golf Club</p>
        </div>

        {policy ? <p className="footer-policy">{notes[policy]}</p> : null}

        <div className="footer-legal">
          <p>© 2026 Golf Club. All Rights Reserved</p>
          <div className="footer-legal-links">
            <button type="button" aria-pressed={policy === "terms"} onClick={() => choosePolicy("terms")}>
              Terms & Conditions
            </button>
            <button type="button" aria-pressed={policy === "privacy"} onClick={() => choosePolicy("privacy")}>
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
