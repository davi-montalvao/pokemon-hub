import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Panel } from "@/components/Panel";
import { StatsBar } from "@/components/StatsBar";
import { TypeBadge } from "@/components/TypeBadge";
import {
  formatPokemonName,
  getArtworkUrl,
  getPokemon,
} from "@/lib/pokeapi";

type PokemonPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PokemonPageProps) {
  const { id } = await params;

  try {
    const pokemon = await getPokemon(id);
    return {
      title: `${formatPokemonName(pokemon.name)} | Pokemon Hub`,
      description: `Detalhes de ${formatPokemonName(pokemon.name)} no Pokemon Hub.`,
    };
  } catch {
    return {
      title: "Pokémon não encontrado | Pokemon Hub",
    };
  }
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { id } = await params;

  let pokemon;

  try {
    pokemon = await getPokemon(id);
  } catch {
    notFound();
  }

  return (
    <Panel title={`#${String(pokemon.id).padStart(3, "0")}`}>
      <div className="mb-6">
        <Link href="/" className="btn btn-ghost px-3 py-2 text-sm">
          ← Voltar
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-[260px_1fr]">
        <div className="rounded-2xl bg-surface-muted p-6 text-center">
          <Image
            src={
              pokemon.sprites.other?.["official-artwork"]?.front_default ??
              getArtworkUrl(pokemon.id)
            }
            alt={formatPokemonName(pokemon.name)}
            width={220}
            height={220}
            className="mx-auto h-48 w-48 object-contain sm:h-56 sm:w-56"
            unoptimized
            priority
          />
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {formatPokemonName(pokemon.name)}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {pokemon.types.map((entry) => (
                <TypeBadge key={entry.type.name} type={entry.type.name} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-surface-muted p-4">
              <p className="text-sm text-ink-muted">Altura</p>
              <p className="mt-1 text-lg font-semibold">
                {(pokemon.height / 10).toFixed(1)} m
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface-muted p-4">
              <p className="text-sm text-ink-muted">Peso</p>
              <p className="mt-1 text-lg font-semibold">
                {(pokemon.weight / 10).toFixed(1)} kg
              </p>
            </div>
          </div>

          <FavoriteButton id={pokemon.id} name={pokemon.name} />

          <div>
            <h3 className="mb-4 text-base font-semibold text-ink">Stats base</h3>
            <StatsBar stats={pokemon.stats} />
          </div>
        </div>
      </div>
    </Panel>
  );
}
