import type { FavoritePokemon } from "@/types/pokemon";

const STORAGE_KEY = "pokemon-hub-favorites";
const LEGACY_STORAGE_KEY = "pixeldex-favorites";

export function getFavorites(): FavoritePokemon[] {
  if (typeof window === "undefined") return [];

  try {
    const raw =
      localStorage.getItem(STORAGE_KEY) ??
      localStorage.getItem(LEGACY_STORAGE_KEY);

    if (!raw) return [];

    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, raw);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    }

    return JSON.parse(raw) as FavoritePokemon[];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites: FavoritePokemon[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  localStorage.removeItem(LEGACY_STORAGE_KEY);
}

export function isFavorite(id: number): boolean {
  return getFavorites().some((item) => item.id === id);
}

export function toggleFavorite(pokemon: FavoritePokemon): FavoritePokemon[] {
  const current = getFavorites();
  const exists = current.some((item) => item.id === pokemon.id);
  const next = exists
    ? current.filter((item) => item.id !== pokemon.id)
    : [...current, pokemon];

  saveFavorites(next);
  return next;
}
