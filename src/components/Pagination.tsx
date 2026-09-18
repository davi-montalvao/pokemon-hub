"use client";

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        className="btn px-4 py-2.5 text-sm"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        Anterior
      </button>
      <span className="min-w-24 text-center text-sm font-medium text-ink-muted">
        {page} / {totalPages}
      </span>
      <button
        type="button"
        className="btn px-4 py-2.5 text-sm"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        Próximo
      </button>
    </div>
  );
}
