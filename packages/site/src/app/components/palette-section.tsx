import { sageveil } from '@sageveil/palette';
import { Card } from './card';

const ansiOrder = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'] as const;

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

function SwatchGrid({ title, description, swatches }: { title: string; description?: string; swatches: Swatch[] }) {
  return (
    <Card className="grid gap-4 bg-[var(--sv-base-black-65)] p-6">
      <header className="grid gap-1">
        <h3 className="text-[1.25rem] capitalize">{title}</h3>
        {description ? <p className="m-0 text-[0.9rem] text-[var(--sv-muted)]">{description}</p> : null}
      </header>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
        {swatches.map((swatch) => (
          <div
            key={`${title}-${swatch.label}`}
            className="flex items-center gap-3 rounded-[16px] border border-[var(--sv-border-25)] bg-[var(--sv-surface-70)] px-3 py-2.5"
          >
            <span
              className="h-8 w-8 shrink-0 rounded-[10px] border border-[var(--sv-white-8)]"
              style={{ backgroundColor: swatch.value }}
            />
            <div className="grid">
              <span className="text-[0.85rem] font-semibold capitalize text-[var(--sv-base-white)]">
                {swatch.label}
              </span>
              <span className="text-[0.78rem] uppercase tracking-[0.08em] text-[var(--sv-muted)]">
                {swatch.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function PaletteSection() {
  return (
    <Card id="about" className="mt-16 grid gap-7 rounded-[26px] bg-[linear-gradient(135deg,var(--sv-palette-from),var(--sv-palette-to))] p-9">
      <div className="grid max-w-[760px] gap-3">
        <h2 className="text-[clamp(2rem,3vw,2.6rem)]">
          Minimalist, low-contrast, green-tinted
        </h2>
        <p className="m-0 text-[var(--sv-muted)] leading-[1.6]">
          Every Sageveil port pulls from the same base + bright ANSI colors plus the supporting
          surface and UI tones. Use these tokens everywhere to keep tools consistent.
        </p>
      </div>
      <div className="grid gap-5">
        <div className="grid gap-5 lg:grid-cols-2">
          <SwatchGrid title="ANSI base" description="Core terminal colors" swatches={baseAnsi} />
          <SwatchGrid title="ANSI bright" description="Bright terminal colors" swatches={brightAnsi} />
        </div>
        <SwatchGrid title="Extras" description="Interface and surface tones" swatches={extras} />
      </div>
    </Card>
  );
}
