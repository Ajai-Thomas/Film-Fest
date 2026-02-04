export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-accent overflow-hidden">
      
      {/* Grain + vignette */}
      <div className="hero-texture" />
      <div className="hero-vignette" />

      {/* BLACK BOTTOM FADE */}
      <div className="hero-bottom-fade" />

      {/* Content */}
      <div className="relative z-10 text-center pt-16">

        {/* MAIN TITLE */}
        <h1
          className="
            font-quittance
            text-[clamp(4rem,9.2vw,8.6rem)]   /* ⬅ reduced */
            font-extrabold
            tracking-[-0.045em]              /* ⬅ slightly tighter */
            leading-[1]
            scale-y-[1.08]                   /* ⬅ reduced from 1.14 */
            scale-x-[1.03]                   /* ⬅ reduced from 1.06 */
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
