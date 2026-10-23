import Mask from "./Mask";
import { Spark } from "./Icons";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="l-wrap about-grid">
        <div className="about-copy">
          <p className="about-kicker">
            <Mask>
              <span className="dot" aria-hidden="true" />
              About
            </Mask>
          </p>
          <Mask as="p" className="about-body" delay={80}>
            Everything we create — from clubs and apparel to on-course essentials — is
            designed to work together and support a real swing. Our goal is to be there
            for every round, every practice, and every level of player.
          </Mask>
        </div>
        <div className="about-title">
          <h2>
            <Mask>Built Around</Mask>
            <Mask className="soft" delay={120}>
              How Golfers Play.
            </Mask>
          </h2>
          <Mask as="p" className="system-label" delay={220}>
            Your complete golf support system
          </Mask>
        </div>
        <div className="about-collab">
          <Mask delay={40}>
            <span className="pill">Collaboration</span>
          </Mask>
          <div className="person">
            <div className="avatar">
              <img src="/images/avatar.jpg" alt="Amelia Cho" width="96" height="96" />
              <span className="avatar-badge" aria-hidden="true">
                <Spark />
              </span>
            </div>
            <div className="person-copy">
              <Mask className="person-name" delay={100}>
                Amelia Cho
              </Mask>
              <Mask className="person-role" delay={170}>
                Tour Ambassador
              </Mask>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
