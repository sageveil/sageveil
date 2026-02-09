import type { HTMLAttributes, PropsWithChildren } from 'react';

type DivProps = HTMLAttributes<HTMLDivElement>;

interface CardProps extends PropsWithChildren<DivProps> {
  className?: string;
}

export function Card({ className = '', children, ...rest }: CardProps) {
  return (
    <div
      className={`rounded-[22px] border border-[var(--sv-border-50)] shadow-[0_14px_30px_var(--sv-shadow-35),0_0_24px_var(--sv-magenta-glow-18)] ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
