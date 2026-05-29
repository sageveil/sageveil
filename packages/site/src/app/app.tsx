import { useState } from 'react';
import type { PropsWithChildren } from 'react';
import { sageveil } from '@sageveil/palette';
import { CtaSection } from './components/cta-section';
import { Hero } from './components/hero';
import { PaletteSection } from './components/palette-section';
import { PortsSection } from './components/ports-section';
import { TerminalPreview } from './components/terminal-preview';
import { buildPortLinks, defaultRepoUrl } from './port-links';
import { portList } from './ports-data';

const tags = Array.from(
  new Set(portList.flatMap((port) => port.tags).filter(Boolean)),
).sort((a, b) => a.localeCompare(b));

const themeVars: Record<string, string> = {
  '--sv-base-black': sageveil.ansi.base.black,
  '--sv-base-red': sageveil.ansi.base.red,
  '--sv-base-green': sageveil.ansi.base.green,
  '--sv-base-yellow': sageveil.ansi.base.yellow,
  '--sv-base-blue': sageveil.ansi.base.blue,
  '--sv-base-magenta': sageveil.ansi.base.magenta,
  '--sv-base-cyan': sageveil.ansi.base.cyan,
  '--sv-base-white': sageveil.ansi.base.white,
  '--sv-bright-black': sageveil.ansi.bright.black,
  '--sv-bright-red': sageveil.ansi.bright.red,
  '--sv-bright-green': sageveil.ansi.bright.green,
  '--sv-bright-yellow': sageveil.ansi.bright.yellow,
  '--sv-bright-blue': sageveil.ansi.bright.blue,
  '--sv-bright-magenta': sageveil.ansi.bright.magenta,
  '--sv-bright-cyan': sageveil.ansi.bright.cyan,
  '--sv-bright-white': sageveil.ansi.bright.white,
  '--sv-surface': sageveil.extras.surface,
  '--sv-overlay': sageveil.extras.overlay,
  '--sv-highlight': sageveil.extras.highlight,
  '--sv-border': sageveil.extras.border,
  '--sv-muted': sageveil.extras.muted,
  '--sv-dim': sageveil.extras.dim,
  '--sv-cursor': sageveil.extras.cursor,
  '--sv-cursor-text': sageveil.extras.cursor_text,
};

const applyTheme = () => {
  const root = document.documentElement;
  for (const [name, value] of Object.entries(themeVars)) {
    root.style.setProperty(name, value);
  }
};

const repoUrl = import.meta.env.VITE_REPO_URL ?? defaultRepoUrl;

if (typeof document !== 'undefined') {
  applyTheme();
}

function Band({ alt = false, children }: PropsWithChildren<{ alt?: boolean }>) {
  return (
    <section
      className={`w-full border-b border-[var(--sv-hairline)] ${
        alt ? 'bg-[var(--sv-band-alt)]' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto w-full max-w-[1120px] px-5 py-20 sm:px-8 sm:py-28">
        {children}
      </div>
    </section>
  );
}

export function App() {
  const [activeTag, setActiveTag] = useState('all');

  const filteredPorts =
    activeTag === 'all'
      ? portList
      : portList.filter((port) => port.tags.includes(activeTag));

  return (
    <main className="relative">
      <Band>
        <div className="grid gap-16">
          <Hero />
          <TerminalPreview />
        </div>
      </Band>
      <Band alt>
        <PaletteSection />
      </Band>
      <Band>
        <PortsSection
          tags={tags}
          activeTag={activeTag}
          onTagChange={setActiveTag}
          ports={filteredPorts}
          linksForPort={(port) =>
            buildPortLinks({ repoUrl, slug: port.slug, version: port.version })
          }
        />
      </Band>
      <Band alt>
        <CtaSection repoUrl={repoUrl} />
      </Band>
    </main>
  );
}

export default App;
