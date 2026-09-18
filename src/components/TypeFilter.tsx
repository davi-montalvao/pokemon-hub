"use client";

import { getTypeColor } from "@/lib/type-colors";

type TypeFilterProps = {
  types: string[];
  selected: string;
  onChange: (type: string) => void;
};

export function TypeFilter({ types, selected, onChange }: TypeFilterProps) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-ink">Tipo</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onChange("")}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition sm:text-sm ${
            selected === ""
              ? "bg-ink text-white"
              : "border border-border bg-surface text-ink-muted hover:border-ink/20 hover:text-ink"
          }`}
        >
          Todos
        </button>
        {types.map((type) => {
          const active = selected === type;

          return (
            <button
              key={type}
              type="button"
              onClick={() => onChange(type)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize text-ink transition sm:text-sm ${
                active ? "ring-2 ring-ink ring-offset-2" : "opacity-90 hover:opacity-100"
              }`}
              style={{ backgroundColor: getTypeColor(type) }}
            >
              {type}
            </button>
          );
        })}
      </div>
    </div>
  );
}
