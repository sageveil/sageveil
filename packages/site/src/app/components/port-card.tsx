import type { PortInfo } from '../types';
import { Card } from './card';
import { TagPill } from './tag-pill';

const iconButtonBase =
  'inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--sv-bright-white)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--sv-magenta-10)] hover:shadow-[0_10px_24px_var(--sv-shadow-40)]';

interface PortCardProps {
  port: PortInfo;
  index: number;
  portLink: string;
}

export function PortCard({ port, index, portLink }: PortCardProps) {
  const releaseUrl = `https://github.com/sageveil/${port.slug}/releases/tag/${port.version}`;
  const downloadUrl = `https://github.com/sageveil/${port.slug}/releases/download/${port.version}/sageveil-${port.slug}-${port.version}.zip`;

  return (
    <Card
      className="grid gap-3.5 bg-[var(--sv-card)] p-[20px_22px] shadow-[0_18px_40px_var(--sv-shadow-40)] opacity-0 animate-[fadeUp_0.7s_ease_forwards]"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="flex items-baseline justify-between gap-2.5">
        <h3 className="text-[1.4rem]">{port.displayName}</h3>
        <a
          className="inline-flex items-center gap-1 text-[0.85rem] text-[var(--sv-muted)] transition-colors duration-200 hover:text-[var(--sv-base-magenta)]"
          href={releaseUrl}
          aria-label={`View ${port.displayName} release ${port.version}`}
        >
          v{port.version}
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
            <path d="M14 3a1 1 0 1 0 0 2h3.586l-6.793 6.793a1 1 0 1 0 1.414 1.414L19 6.414V10a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-6Z" />
            <path d="M5 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4a1 1 0 1 0-2 0v4H5V7h4a1 1 0 1 0 0-2H5Z" />
          </svg>
        </a>
      </div>
      <p className="m-0 text-[var(--sv-muted)] leading-[1.5]">{port.description}</p>
      <div className="flex flex-wrap gap-2">
        {port.tags.map((tag) => (
          <TagPill key={`${port.slug}-${tag}`} label={tag} />
        ))}
      </div>
      <div className="mt-1.5">
        <div className="flex items-center gap-2">
          <a className={iconButtonBase} href={portLink} aria-label="View files on GitHub">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.343-3.369-1.343-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.071 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.349-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.55 9.55 0 0 1 2.506.338c1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.338 4.687-4.566 4.935.359.309.679.92.679 1.855 0 1.338-.012 2.418-.012 2.747 0 .268.18.577.688.48C19.138 20.162 22 16.417 22 12c0-5.523-4.477-10-10-10Z" />
            </svg>
          </a>
          <a className={iconButtonBase} href={downloadUrl} aria-label="Download release asset">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M12 3a1 1 0 0 1 1 1v9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-5.004 5.004a1 1 0 0 1-1.414 0l-5.004-5.004a1 1 0 0 1 1.414-1.414L11 13.586V4a1 1 0 0 1 1-1Zm-7 14a1 1 0 0 1 1 1v1h12v-1a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1Z" />
            </svg>
          </a>
        </div>
      </div>
    </Card>
  );
}
