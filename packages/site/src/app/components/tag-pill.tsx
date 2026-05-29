interface TagPillProps {
  label: string;
}

export function TagPill({ label }: TagPillProps) {
  return (
    <span className="inline-flex h-7 items-center rounded-full border border-[var(--sv-hairline)] px-3 text-[0.72rem] font-medium tracking-[0.08em] text-[var(--sv-muted)] uppercase">
      {label}
    </span>
  );
}
