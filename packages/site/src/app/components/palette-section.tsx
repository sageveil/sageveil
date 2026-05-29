import { sageveil } from '@sageveil/palette';

const ansiOrder = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
] as const;

type Swatch = {
  label: string;
  value: string;
};

const extras: Swatch[] = [
  { label: 'Surface', value: sageveil.extras.surface },
  { label: 'Overlay', value: sageveil.extras.overlay },
  { label: 'Highlight', value: sageveil.extras.highlight },
  { label: 'Border', value: sageveil.extras.border },
  { label: 'Muted', value: sageveil.extras.muted },
  { label: 'Dim', value: sageveil.extras.dim },
  { label: 'Cursor', value: sageveil.extras.cursor },
  { label: 'Cursor Text', value: sageveil.extras.cursor_text },
];

const baseAnsi: Swatch[] = ansiOrder.map((key) => ({
  label: key,
  value: sageveil.ansi.base[key],
}));

const brightAnsi: Swatch[] = ansiOrder.map((key) => ({
  label: key,
  value: sageveil.ansi.bright[key],
}));

function SwatchCard({ swatch }: { swatch: Swatch }) {
  return (
    <div className="group grid gap-3">
      <span
        className="aspect-[5/4] w-full rounded-xl border border-[var(--sv-hairline)] transition-transform duration-200 group-hover:-translate-y-1"
        style={{ backgroundColor: swatch.value }}
      />
      <div className="flex items-baseline justify-between gap-2 px-0.5">
        <span className="text-[0.85rem] font-medium text-[var(--sv-bright-white)] capitalize">
          {swatch.label}
        </span>
        <span className="mono text-[0.72rem] tracking-[0.05em] text-[var(--sv-muted)] uppercase">
          {swatch.value}
        </span>
      </div>
    </div>
  );
}

function SwatchGroup({
  title,
  swatches,
}: {
  title: string;
  swatches: Swatch[];
}) {
  return (
    <div className="grid gap-5">
      <h3 className="text-[1.4rem] text-[var(--sv-bright-white)] capitalize">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {swatches.map((swatch) => (
          <SwatchCard key={`${title}-${swatch.label}`} swatch={swatch} />
        ))}
      </div>
    </div>
  );
}

export function PaletteSection() {
  return (
    <section id="palette" className="grid gap-12">
      <div className="grid max-w-[820px] gap-5">
        <span className="text-[0.72rem] font-medium tracking-[0.22em] text-[var(--sv-accent)] uppercase">
          The palette
        </span>
        <h2 className="text-[clamp(2.4rem,5vw,4rem)] font-light text-[var(--sv-bright-white)]">
          Minimalist, low-contrast, green-tinted.
        </h2>
        <p className="m-0 text-[1.05rem] leading-[1.65] text-[var(--sv-muted)]">
          Every Sageveil port pulls from the same base and bright ANSI colors
          plus supporting surface tones. The same tokens everywhere keep tools
          quietly consistent.
        </p>
      </div>

      {/* Full-bleed color ribbon */}
      <div className="flex h-16 w-full overflow-hidden rounded-xl border border-[var(--sv-hairline)] sm:h-24">
        {baseAnsi.map((swatch) => (
          <span
            key={`ribbon-${swatch.label}`}
            className="flex-1 transition-[flex-grow] duration-300 hover:flex-[1.6]"
            style={{ backgroundColor: swatch.value }}
            title={`${swatch.label} ${swatch.value}`}
          />
        ))}
      </div>

      <div className="grid gap-12">
        <SwatchGroup title="ANSI base" swatches={baseAnsi} />
        <SwatchGroup title="ANSI bright" swatches={brightAnsi} />
        <SwatchGroup title="Extras" swatches={extras} />
      </div>
    </section>
  );
}
