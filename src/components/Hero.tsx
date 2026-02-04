/* src/components/Hero.tsx */
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-accent overflow-hidden">
      
      {/* Grain + vignette (z-1 and z-2) */}
      <div className="hero-texture" />
      <div className="hero-vignette" />

      {/* BLACK BOTTOM GRADIENT
         - h-56: Reduced height (was h-96)
         - z-5:  Sits BEHIND the content (z-10) so text is visible
      */}
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-black via-black/60 to-transparent z-5 pointer-events-none" />

      {/* Content (z-10) */}
      <div className="relative z-10 text-center pt-16">

        {/* MAIN TITLE */}
        <h1
          className="
            font-quittance
            text-[clamp(4rem,9.2vw,8.6rem)]
            font-extrabold
            tracking-[-0.045em]
            leading-[1]
            scale-y-[1.08]
            scale-x-[1.03]
            uppercase
            whitespace-nowrap
            text-image-black
          "
        >
          TKM&nbsp;FILM&nbsp;FEST
        </h1>

        {/* ANCHOR LINE */}
        <div className="mx-auto mt-5 h-[3px] w-40 bg-black" />

        {/* DATES */}
        <div className="mt-7 text-black text-base tracking-[0.45em] uppercase font-semibold">
          13 · 14 · 15 FEB
        </div>

        {/* TAGLINE */}
        <p className="mt-4 text-black text-base italic opacity-90">
          By artists. For artists.
        </p>

        {/* CTA */}
        <div className="mt-16">
          <a
            href="#register"
            className="
              inline-flex items-center gap-2
              text-black
              font-semibold
              tracking-[0.32em]
              text-sm
              uppercase
              hover:opacity-70
              transition
            "
          >
            Register for Screening →
          </a>
        </div>

      </div>
    </section>
  );
}