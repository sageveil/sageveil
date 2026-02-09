interface TagPillProps {
  label: string;
}

export function TagPill({ label }: TagPillProps) {
  return (
    <span className="inline-flex h-7 items-center rounded-full border border-[var(--sv-magenta-40)] bg-[var(--sv-magenta-10)] px-3 text-[0.75rem] font-medium text-[var(--sv-bright-white)]">
      {label}
    </span>
  );
}
