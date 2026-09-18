import Link from "next/link";
import { getPokemonByType, getPokemonList } from "@/lib/pokeapi";
import { getTypeColor } from "@/lib/type-colors";

const FACTS = [
  {
    type: "flying",
    title: "Podem voar",
    description: "Tipo Flying",
  },
  {
    type: "fire",
    title: "Tipo Fire",
    description: "Pokémon de fogo",
  },
  {
    type: "water",
    title: "Tipo Water",
    description: "Pokémon de água",
  },
  {
    type: "electric",
    title: "Tipo Electric",
    description: "Pokémon elétricos",
  },
  {
    type: "dragon",
    title: "Tipo Dragon",
    description: "Pokémon dragão",
  },
] as const;

const cardClassName =
  "rounded-xl border border-border bg-surface-muted p-3 transition hover:border-accent/40 hover:bg-surface sm:p-4";

export async function Curiosidades() {
  const [list, ...typeDetails] = await Promise.all([
    getPokemonList(1, 1),
    ...FACTS.map((fact) => getPokemonByType(fact.type)),
  ]);

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3">
      <Link href="/#explorar" className={`${cardClassName} col-span-2 lg:col-span-1`}>
        <p className="text-xs text-ink-muted sm:text-sm">No total</p>
        <p className="mt-1 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          {list.count.toLocaleString("pt-BR")}
        </p>
        <p className="mt-1 text-xs text-ink-muted sm:text-sm">
          Pokémon registrados · Ver todos →
        </p>
      </Link>

      {FACTS.map((fact, index) => {
        const count = typeDetails[index]?.pokemon.length ?? 0;

        return (
          <Link
            key={fact.type}
            href={`/?type=${fact.type}#explorar`}
            className={cardClassName}
            style={{
              borderLeftColor: getTypeColor(fact.type),
              borderLeftWidth: 4,
            }}
          >
            <p className="text-xs text-ink-muted sm:text-sm">{fact.title}</p>
            <p className="mt-1 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              {count.toLocaleString("pt-BR")}
            </p>
            <p className="mt-1 text-xs text-ink-muted sm:text-sm">
              {fact.description}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
