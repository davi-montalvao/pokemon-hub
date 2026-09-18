"use client";

import { useEffect, useState } from "react";
import { getFavorites, toggleFavorite } from "@/lib/favorites";
import type { FavoritePokemon } from "@/types/pokemon";
import { PokemonCard } from "./PokemonCard";

export function FavoritesList() {
  const [favorites, setFavorites] = useState<FavoritePokemon[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setFavorites(getFavorites());
    setReady(true);
  }, []);

  function handleToggle(pokemon: FavoritePokemon) {
    const next = toggleFavorite(pokemon);
    setFavorites(next);
  }

  if (!ready) {
    return (
      <p className="rounded-xl border border-border bg-surface-muted px-4 py-10 text-center text-sm text-ink-muted">
        Carregando favoritos...
      </p>
    );
  }

  if (favorites.length === 0) {
    return (
      <p className="rounded-xl border border-border bg-surface-muted px-4 py-10 text-center text-sm leading-relaxed text-ink-muted">
        Sua lista de favoritos está vazia.
        <br />
        Salve alguns Pokémon no Pokemon Hub.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {favorites.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          isFavorite
          onToggleFavorite={() => handleToggle(pokemon)}
        />
      ))}
    </div>
  );
}
