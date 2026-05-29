import { Card } from './card';

const dot = 'h-3 w-3 rounded-full';

export function TerminalPreview() {
  return (
    <Card className="overflow-hidden bg-[var(--sv-term-bg)] p-0">
      <div className="flex items-center gap-2 border-b border-[var(--sv-hairline)] bg-[var(--sv-term-bar)] px-4 py-3">
        <span className={`${dot} bg-[var(--sv-base-red)]`} />
        <span className={`${dot} bg-[var(--sv-base-yellow)]`} />
        <span className={`${dot} bg-[var(--sv-base-green)]`} />
        <span className="ml-3 text-[0.78rem] text-[var(--sv-muted)]">
          ~/sageveil — zsh
        </span>
      </div>
      <pre className="mono overflow-x-auto px-5 py-5 text-[0.86rem] leading-[1.7] text-[var(--sv-syn-text)]">
        <code>
          <span className="text-[var(--sv-accent)]">~/sageveil</span>{' '}
          <span className="text-[var(--sv-syn-punc)]">$</span>{' '}
          <span className="text-[var(--sv-syn-func)]">ls</span>{' '}
          <span className="text-[var(--sv-syn-const)]">--color</span>
          {'\n'}
          <span className="text-[var(--sv-base-blue)]">packages/</span>
          {'  '}
          <span className="text-[var(--sv-base-blue)]">dist/</span>
          {'  '}
          <span className="text-[var(--sv-syn-text)]">README.md</span>
          {'  '}
          <span className="text-[var(--sv-base-green)]">build.sh</span>
          {'\n\n'}
          <span className="text-[var(--sv-accent)]">~/sageveil</span>{' '}
          <span className="text-[var(--sv-syn-punc)]">$</span>{' '}
          <span className="text-[var(--sv-syn-func)]">cat</span>{' '}
          <span className="text-[var(--sv-syn-const)]">theme.ts</span>
          {'\n'}
          <span className="text-[var(--sv-syn-comment)]">
            // sageveil — calm, verdant palette
          </span>
          {'\n'}
          <span className="text-[var(--sv-syn-keyword)]">
            export const
          </span>{' '}
          <span className="text-[var(--sv-syn-text)]">theme</span>{' '}
          <span className="text-[var(--sv-syn-punc)]">=</span>{' '}
          <span className="text-[var(--sv-syn-punc)]">{'{'}</span>
          {'\n  '}
          <span className="text-[var(--sv-syn-func)]">accent</span>
          <span className="text-[var(--sv-syn-punc)]">:</span>{' '}
          <span className="text-[var(--sv-syn-string)]">'#7E9270'</span>
          <span className="text-[var(--sv-syn-punc)]">,</span>{' '}
          <span className="text-[var(--sv-syn-comment)]">// green</span>
          {'\n  '}
          <span className="text-[var(--sv-syn-func)]">contrast</span>
          <span className="text-[var(--sv-syn-punc)]">:</span>{' '}
          <span className="text-[var(--sv-syn-keyword)]">'low'</span>
          <span className="text-[var(--sv-syn-punc)]">,</span>
          {'\n'}
          <span className="text-[var(--sv-syn-punc)]">{'}'}</span>
          {'\n\n'}
          <span className="text-[var(--sv-accent)]">~/sageveil</span>{' '}
          <span className="text-[var(--sv-syn-punc)]">$</span>{' '}
          <span className="inline-block h-[1.05em] w-[0.6ch] translate-y-[0.18em] bg-[var(--sv-cursor)]" />
        </code>
      </pre>
    </Card>
  );
}
