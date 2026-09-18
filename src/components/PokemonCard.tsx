"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPokemonName, getSpriteUrl } from "@/lib/pokeapi";

type PokemonCardProps = {
  id: number;
  name: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
};

export function PokemonCard({
  id,
  name,
  isFavorite = false,
  onToggleFavorite,
}: PokemonCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-surface transition duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_16px_32px_rgba(18,21,26,0.08)]">
      {onToggleFavorite ? (
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            onToggleFavorite();
          }}
          className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface/95 text-sm text-ink-muted transition hover:border-accent hover:text-accent"
          aria-label={isFavorite ? "Remover dos favoritos" : "Favoritar"}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      ) : null}

      <Link href={`/pokemon/${id}`} className="block p-4 text-center">
        <div className="mx-auto mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-surface-muted transition group-hover:bg-accent-soft/60">
          <Image
            src={getSpriteUrl(id)}
            alt={formatPokemonName(name)}
            width={96}
            height={96}
            className="h-20 w-20 object-contain"
            unoptimized
          />
        </div>
        <p className="text-xs font-medium text-ink-muted">
          #{String(id).padStart(3, "0")}
        </p>
        <h2 className="mt-1 text-sm font-semibold text-ink sm:text-base">
          {formatPokemonName(name)}
        </h2>
      </Link>
    </article>
  );
}
