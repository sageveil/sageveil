import { Card } from './card';

interface CtaSectionProps {
  repoUrl: string;
}

export function CtaSection({ repoUrl }: CtaSectionProps) {
  return (
    <section className="mt-20 grid gap-7">
      <Card className="grid items-center gap-5 rounded-[28px] bg-[linear-gradient(120deg,var(--sv-cta-from),var(--sv-cta-to))] p-[28px_32px] md:grid-cols-[1fr_auto]">
        <div className="grid gap-2">
          <h2 className="text-[clamp(1.6rem,2.5vw,2.2rem)]">Open on GitHub</h2>
          <p className="m-0 text-[0.95rem] text-[var(--sv-muted)] leading-[1.6]">
            Browse source, report issues, and track releases in the monorepo.
          </p>
        </div>
        <div className="flex justify-start md:justify-self-center">
          <a
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--sv-bright-magenta-40)] bg-[linear-gradient(135deg,var(--sv-bright-magenta-20),var(--sv-bright-blue-20))] px-5 py-2.5 text-[0.95rem] font-semibold text-[var(--sv-base-white)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--sv-bright-magenta-60)] hover:shadow-[0_10px_24px_var(--sv-shadow-40)]"
            href={repoUrl}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.343-3.369-1.343-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.071 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.349-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.55 9.55 0 0 1 2.506.338c1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.338 4.687-4.566 4.935.359.309.679.92.679 1.855 0 1.338-.012 2.418-.012 2.747 0 .268.18.577.688.48C19.138 20.162 22 16.417 22 12c0-5.523-4.477-10-10-10Z" />
            </svg>
            GitHub repo
          </a>
        </div>
      </Card>
    </section>
  );
}
