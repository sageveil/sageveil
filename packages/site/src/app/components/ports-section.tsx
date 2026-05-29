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
  'rounded-full border px-4 py-2 text-[0.85rem] font-medium capitalize transition-colors duration-200';
const filterIdle =
  'border-[var(--sv-hairline)] text-[var(--sv-muted)] hover:border-[var(--sv-accent-line)] hover:text-[var(--sv-accent)]';
const filterActive =
  'border-[var(--sv-accent-line)] bg-[var(--sv-accent-soft)] text-[var(--sv-accent)]';

export function PortsSection({
  tags,
  activeTag,
  onTagChange,
  ports,
  linksForPort,
}: PortsSectionProps) {
  return (
    <section id="ports" className="grid gap-10">
      <div className="grid max-w-[760px] gap-5">
        <span className="text-[0.72rem] font-medium tracking-[0.22em] text-[var(--sv-accent)] uppercase">
          The ports
        </span>
        <h2 className="text-[clamp(2.4rem,5vw,4rem)] font-light text-[var(--sv-bright-white)]">
          Ports that move together.
        </h2>
        <p className="m-0 text-[1.05rem] leading-[1.65] text-[var(--sv-muted)]">
          Each port ships from the same tokens with its own tailored
          configuration. Tags help you spot the right target quickly.
        </p>
      </div>
      <div
        className="flex flex-wrap gap-2.5"
        role="group"
        aria-label="Filter ports by tag"
      >
        <button
          className={`${filterBase} ${activeTag === 'all' ? filterActive : filterIdle}`}
          type="button"
          aria-pressed={activeTag === 'all'}
          onClick={() => onTagChange('all')}
        >
          All ports
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            className={`${filterBase} ${activeTag === tag ? filterActive : filterIdle}`}
            type="button"
            aria-pressed={activeTag === tag}
            onClick={() => onTagChange(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
        {ports.map((port, index) => (
          <PortCard
            key={port.slug}
            port={port}
            index={index}
            links={linksForPort(port)}
          />
        ))}
      </div>
    </section>
  );
}
