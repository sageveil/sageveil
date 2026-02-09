import { useEffect, useState } from 'react';
import { sageveil } from '@sageveil/palette';
import ports from '../data/ports.json';
import type { PortInfo } from './types';
import { CtaSection } from './components/cta-section';
import { Hero } from './components/hero';
import { PaletteSection } from './components/palette-section';
import { PortsSection } from './components/ports-section';

const portList = ports as PortInfo[];
const tags = Array.from(
  new Set(portList.flatMap((port) => port.tags).filter(Boolean))
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
};

const applyTheme = () => {
  const root = document.documentElement;
  for (const [name, value] of Object.entries(themeVars)) {
    root.style.setProperty(name, value);
  }
};

const repoUrl = import.meta.env.VITE_REPO_URL ?? 'https://github.com/sageveil/sageveil';

export function App() {
  useEffect(() => {
    applyTheme();
  }, []);

  const [activeTag, setActiveTag] = useState('all');

  const filteredPorts =
    activeTag === 'all'
      ? portList
      : portList.filter((port) => port.tags.includes(activeTag));

  const portLink = (slug: string) =>
    import.meta.env.VITE_REPO_URL
      ? `${repoUrl}/tree/main/packages/ports/${slug}`
      : `https://github.com/sageveil/${slug}`;

  return (
    <div className="relative z-10 mx-auto max-w-[1160px] px-[18px] pb-[96px] pt-[56px] sm:px-6 sm:pb-[120px] sm:pt-[72px]">
      <div className="noise" />
      <Hero />
      <PaletteSection />
      <PortsSection
        tags={tags}
        activeTag={activeTag}
        onTagChange={setActiveTag}
        ports={filteredPorts}
        portLink={portLink}
      />
      <CtaSection repoUrl={repoUrl} />
    </div>
  );
}

export default App;
