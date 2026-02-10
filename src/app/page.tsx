import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FilmsSection from "../components/FilmsSection";
import Reveal from "../components/Reveal";

export default function Home() {
  return (
    <>
      <Navbar />
      
      {/* The Hero loads immediately, so we can use a slight delay if we want, 
          or just let Framer Motion handle the initial fade in */}
      <Reveal>
        <Hero />
      </Reveal>

      {/* This section will trigger its animation only when you scroll down to it */}
      <Reveal>
        <FilmsSection />
      </Reveal>
    </>
  );
}