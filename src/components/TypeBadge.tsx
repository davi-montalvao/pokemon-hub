import { getTypeColor } from "@/lib/type-colors";

type TypeBadgeProps = {
  type: string;
};

export function TypeBadge({ type }: TypeBadgeProps) {
  return (
    <span
      className="inline-flex rounded-lg px-3 py-1 text-xs font-semibold capitalize text-ink sm:text-sm"
      style={{ backgroundColor: getTypeColor(type) }}
    >
      {type}
    </span>
  );
}
