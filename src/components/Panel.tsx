import type { ReactNode } from "react";

type PanelProps = {
  children: ReactNode;
  className?: string;
  title?: string;
};

export function Panel({ children, className = "", title }: PanelProps) {
  return (
    <section
      className={`rounded-2xl border border-border bg-surface/90 p-5 shadow-[0_20px_50px_rgba(18,21,26,0.04)] backdrop-blur-sm sm:p-6 ${className}`}
      aria-label={title}
    >
      {title ? (
        <header className="mb-5">
          <h1 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            {title}
          </h1>
        </header>
      ) : null}
      {children}
    </section>
  );
}
