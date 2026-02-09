import sageveilMark from '../../assets/sageveil-logo.png';

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 font-semibold transition-all duration-200';

export function Hero() {
  return (
    <header className="grid gap-6 rounded-[28px] border border-[var(--sv-border-60)] bg-[linear-gradient(135deg,var(--sv-hero-from),var(--sv-hero-to))] px-9 pb-7 pt-9 shadow-[0_30px_80px_var(--sv-shadow-40)] animate-[fadeUp_0.9s_ease_forwards] sm:px-12 sm:pb-9 sm:pt-12">
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(200px,260px)]">
        <img
          src={sageveilMark}
          alt="Sageveil emblem"
          loading="eager"
          className="order-1 h-auto w-32 justify-self-center drop-shadow-[0_12px_24px_var(--sv-shadow-35)] sm:w-36 md:order-2 md:w-[min(240px,100%)]"
        />
        <div className="order-2 grid gap-5 md:order-1">
          <h1 className="text-[clamp(2.6rem,4vw,4.4rem)] tracking-[0.02em]">Sageveil</h1>
          <p className="max-w-[680px] text-[1.1rem] leading-[1.7] text-[var(--sv-bright-white)]">
            A calm, verdant color scheme with grounded contrast and a gentle glow. Built for deep
            focus across terminals, editors, and tooling.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              className={`${buttonBase} border-[var(--sv-bright-magenta-60)] bg-[var(--sv-magenta-ink)] text-[var(--sv-bright-white)] shadow-[0_10px_24px_var(--sv-shadow-40)] hover:-translate-y-0.5 hover:border-[var(--sv-bright-magenta-60)] hover:bg-[var(--sv-magenta-ink-hover)]`}
              href="#ports"
            >
              Explore ports
            </a>
            <a
              className={`${buttonBase} border-[var(--sv-border-40)] text-[var(--sv-base-white)] hover:-translate-y-0.5 hover:border-[var(--sv-bright-blue-60)] hover:shadow-[0_10px_24px_var(--sv-shadow-40)]`}
              href="#about"
            >
              See the palette
            </a>
          </div>
        </div>
      </div>
      <div className="mt-2" />
    </header>
  );
}
