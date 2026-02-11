import type { PortInfo } from '../types';
import type { PortLinks } from '../port-links';
import { PortCard } from './port-card';

interface PortsSectionProps {
  tags: string[];
  activeTag: string;
  onTagChange: (tag: string) => void;
  ports: PortInfo[];
  linksForPort: (port: PortInfo) => PortLinks;
}

const filterBase =
  'rounded-full border bg-[var(--sv-surface-60)] px-4 py-2 text-[0.9rem] text-[var(--sv-bright-white)] transition-all duration-200';

export function PortsSection({
  tags,
  activeTag,
  onTagChange,
  ports,
  linksForPort,
}: PortsSectionProps) {
  return (
    <section id="ports" className="mt-16 grid gap-7">
      <div className="grid max-w-[720px] gap-3">
        <h2 className="text-[clamp(2rem,3vw,2.6rem)]">Ports that move together</h2>
        <p className="m-0 text-[var(--sv-muted)] leading-[1.6]">
          Each port ships from the same tokens with its own tailored configuration. Tags help you
          spot the right target quickly.
        </p>
      </div>
      <div className="flex flex-wrap gap-3" role="group" aria-label="Filter ports by tag">
        <button
          className={`${filterBase} border-[var(--sv-magenta-40)] ${
            activeTag === 'all'
              ? 'border-[var(--sv-magenta-60)] bg-[var(--sv-magenta-10)] text-[var(--sv-base-magenta)]'
              : 'hover:border-[var(--sv-magenta-60)] hover:bg-[var(--sv-magenta-10)] hover:text-[var(--sv-base-magenta)]'
          }`}
          type="button"
          aria-pressed={activeTag === 'all'}
          onClick={() => onTagChange('all')}
        >
          All ports
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            className={`${filterBase} border-[var(--sv-magenta-40)] ${
              activeTag === tag
                ? 'border-[var(--sv-magenta-60)] bg-[var(--sv-magenta-10)] text-[var(--sv-base-magenta)]'
                : 'hover:border-[var(--sv-magenta-60)] hover:bg-[var(--sv-magenta-10)] hover:text-[var(--sv-base-magenta)]'
            }`}
            type="button"
            aria-pressed={activeTag === tag}
            onClick={() => onTagChange(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
        {ports.map((port, index) => (
          <PortCard key={port.slug} port={port} index={index} links={linksForPort(port)} />
        ))}
      </div>
    </section>
  );
}

