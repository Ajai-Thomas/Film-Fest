/* src/app/page.tsx */
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FilmsSection from "../components/FilmsSection";
import PromoSection from "../components/PromoSection"; // Import the new component
import Reveal from "../components/Reveal";

export default function Home() {
  return (
    <>
      <Navbar />
      
      <Reveal>
        <Hero />
      </Reveal>

      {/* NEW PROMO SECTION */}
      <Reveal>
        <PromoSection />
      </Reveal>

      <Reveal>
        <FilmsSection />
      </Reveal>
    </>
  );
}