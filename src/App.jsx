import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Memories from "./components/Memories";
import Connect from "./components/Connect";
import Collection from "./components/Collection";
import Series from "./components/Series";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Preloader onReady={() => setReady(true)} />
      <a className="skip" href="#about">
        Skip to content
      </a>
      <div inert={ready ? undefined : true}>
        <Header />
        <main>
          <Hero />
          <About />
          <Memories />
          <Connect />
          <Collection />
          <Series />
        </main>
        <Footer />
      </div>
    </>
  );
}
