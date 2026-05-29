import sageveilMark from '../../assets/sageveil-logo.png';

const primaryBtn =
  'inline-flex items-center justify-center rounded-full bg-[var(--sv-accent)] px-7 py-3 text-[0.95rem] font-semibold text-[var(--sv-accent-ink)] transition-transform duration-200 hover:-translate-y-0.5';
const ghostBtn =
  'inline-flex items-center justify-center rounded-full border border-[var(--sv-hairline-strong)] px-7 py-3 text-[0.95rem] font-semibold text-[var(--sv-bright-white)] transition-colors duration-200 hover:border-[var(--sv-accent-line)] hover:text-[var(--sv-accent)]';

export function Hero() {
  return (
    <header className="grid items-center gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <div className="grid gap-7">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--sv-hairline)] px-3.5 py-1.5 text-[0.72rem] font-medium tracking-[0.22em] text-[var(--sv-muted)] uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--sv-accent)]" />
          Color scheme
        </span>
        <h1 className="text-[clamp(3.2rem,8vw,6.4rem)] font-light text-[var(--sv-bright-white)]">
          Sage<span className="text-[var(--sv-accent)]">veil</span>
        </h1>
        <p className="max-w-[34ch] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.6] text-[var(--sv-base-white)]">
          A calm, verdant color scheme with grounded contrast and a gentle glow
          — built for deep focus across terminals, editors, and tooling.
        </p>
        <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a className={primaryBtn} href="#ports">
            Explore ports
          </a>
          <a className={ghostBtn} href="#palette">
            See the palette
          </a>
        </div>
      </div>
      <div className="relative justify-self-center md:justify-self-end">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-full bg-[var(--sv-accent-soft)] blur-3xl"
        />
        <img
          src={sageveilMark}
          alt="Sageveil emblem"
          loading="eager"
          className="h-auto w-44 sm:w-56 md:w-[min(300px,100%)]"
        />
      </div>
    </header>
  );
}
