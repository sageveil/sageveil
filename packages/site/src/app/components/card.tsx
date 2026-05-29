import type { HTMLAttributes, PropsWithChildren } from 'react';

type DivProps = HTMLAttributes<HTMLDivElement>;

interface CardProps extends PropsWithChildren<DivProps> {
  className?: string;
}

export function Card({ className = '', children, ...rest }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-[var(--sv-hairline)] bg-[var(--sv-card)] shadow-[0_10px_30px_var(--sv-shadow-soft)] ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
