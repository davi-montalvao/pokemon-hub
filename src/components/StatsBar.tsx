import { formatStatName } from "@/lib/pokeapi";
import type { PokemonStat } from "@/types/pokemon";

type StatsBarProps = {
  stats: PokemonStat[];
};

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <ul className="space-y-3">
      {stats.map((item) => {
        const width = Math.min(100, Math.round((item.base_stat / 255) * 100));

        return (
          <li key={item.stat.name}>
            <div className="mb-1.5 flex items-center justify-between gap-2 text-sm">
              <span className="font-medium text-ink-muted">
                {formatStatName(item.stat.name)}
              </span>
              <span className="font-semibold text-ink">{item.base_stat}</span>
            </div>
            <div className="stat-bar">
              <div className="stat-bar-fill" style={{ width: `${width}%` }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
