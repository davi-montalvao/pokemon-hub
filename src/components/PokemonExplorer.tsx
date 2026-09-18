"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toggleFavorite, getFavorites } from "@/lib/favorites";
import {
  PAGE_SIZE,
  getIdFromUrl,
  getPokemonByType,
  getPokemonCatalog,
  getPokemonList,
  getTypes,
} from "@/lib/pokeapi";
import type { FavoritePokemon, PokemonListItem } from "@/types/pokemon";
import { Pagination } from "./Pagination";
import { PokemonCard } from "./PokemonCard";
import { SearchBar } from "./SearchBar";
import { TypeFilter } from "./TypeFilter";

type ListState = {
  items: PokemonListItem[];
  count: number;
};

function matchesSearch(item: PokemonListItem, query: string): boolean {
  const id = getIdFromUrl(item.url);

  if (/^\d+$/.test(query)) {
    return String(id).startsWith(query);
  }

  return item.name.includes(query);
}

export function PokemonExplorer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedType = searchParams.get("type") ?? "";

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<ListState>({ items: [], count: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState<FavoritePokemon[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim().toLowerCase());
      setPage(1);
    }, 250);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
    setSearch("");
    setDebouncedSearch("");
  }, [selectedType]);

  useEffect(() => {
    getTypes()
      .then((response) => {
        const usable = response.results
          .map((item) => item.name)
          .filter((name) => name !== "unknown" && name !== "stellar");
        setTypes(usable);
      })
      .catch(() => setTypes([]));
  }, []);

  const loadList = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      if (debouncedSearch) {
        const catalog = await getPokemonCatalog();
        const filtered = catalog.results.filter((item) =>
          matchesSearch(item, debouncedSearch),
        );
        const start = (page - 1) * PAGE_SIZE;
        const items = filtered.slice(start, start + PAGE_SIZE);
        setData({ items, count: filtered.length });
        return;
      }

      if (selectedType) {
        const typeData = await getPokemonByType(selectedType);
        const all = typeData.pokemon.map((entry) => entry.pokemon);
        const start = (page - 1) * PAGE_SIZE;
        const items = all.slice(start, start + PAGE_SIZE);
        setData({ items, count: all.length });
        return;
      }

      const list = await getPokemonList(page);
      setData({ items: list.results, count: list.count });
    } catch {
      setData({ items: [], count: 0 });
      setError(
        debouncedSearch
          ? "Nenhum Pokémon encontrado para essa busca."
          : "Falha ao carregar o Pokemon Hub. Tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, page, selectedType]);

  useEffect(() => {
    loadList();
  }, [loadList]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(data.count / PAGE_SIZE)),
    [data.count],
  );

  function handleTypeChange(type: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (type) {
      params.set("type", type);
    } else {
      params.delete("type");
    }

    const query = params.toString();
    router.replace(query ? `/?${query}` : "/", { scroll: false });
  }

  function handleToggleFavorite(id: number, name: string) {
    const next = toggleFavorite({ id, name });
    setFavorites(next);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <SearchBar value={search} onChange={setSearch} />
        <TypeFilter
          types={types}
          selected={selectedType}
          onChange={handleTypeChange}
        />
      </div>

      {loading ? (
        <p className="rounded-xl border border-border bg-surface-muted px-4 py-10 text-center text-sm text-ink-muted">
          Carregando Pokemon Hub...
        </p>
      ) : null}

      {!loading && error ? (
        <p className="rounded-xl border border-border bg-accent-soft px-4 py-10 text-center text-sm text-accent-ink">
          {error}
        </p>
      ) : null}

      {!loading && !error && data.items.length === 0 ? (
        <p className="rounded-xl border border-border bg-surface-muted px-4 py-10 text-center text-sm text-ink-muted">
          Nenhum Pokémon por aqui.
        </p>
      ) : null}

      {!loading && !error && data.items.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {data.items.map((item) => {
              const id = getIdFromUrl(item.url);
              const favorite = favorites.some((fav) => fav.id === id);

              return (
                <PokemonCard
                  key={`${item.name}-${id}`}
                  id={id}
                  name={item.name}
                  isFavorite={favorite}
                  onToggleFavorite={() => handleToggleFavorite(id, item.name)}
                />
              );
            })}
          </div>

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      ) : null}
    </div>
  );
}
