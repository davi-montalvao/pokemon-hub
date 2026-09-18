import type {
  Pokemon,
  PokemonListResponse,
  TypeDetailResponse,
  TypeListResponse,
} from "@/types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export const PAGE_SIZE = 20;

export function getIdFromUrl(url: string): number {
  const parts = url.split("/").filter(Boolean);
  return Number(parts[parts.length - 1]);
}

export function getSpriteUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export function getArtworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`PokéAPI error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getPokemonList(
  page = 1,
  pageSize = PAGE_SIZE,
): Promise<PokemonListResponse> {
  const offset = (page - 1) * pageSize;
  return fetchJson<PokemonListResponse>(
    `${BASE_URL}/pokemon?limit=${pageSize}&offset=${offset}`,
  );
}

let catalogCache: PokemonListResponse | null = null;

export async function getPokemonCatalog(): Promise<PokemonListResponse> {
  if (catalogCache) return catalogCache;

  catalogCache = await fetchJson<PokemonListResponse>(
    `${BASE_URL}/pokemon?limit=2000&offset=0`,
  );

  return catalogCache;
}

export async function getPokemon(idOrName: string | number): Promise<Pokemon> {
  return fetchJson<Pokemon>(
    `${BASE_URL}/pokemon/${String(idOrName).toLowerCase()}`,
  );
}

export async function getTypes(): Promise<TypeListResponse> {
  return fetchJson<TypeListResponse>(`${BASE_URL}/type?limit=20`);
}

export async function getPokemonByType(
  typeName: string,
): Promise<TypeDetailResponse> {
  return fetchJson<TypeDetailResponse>(`${BASE_URL}/type/${typeName}`);
}

export function formatPokemonName(name: string): string {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatStatName(name: string): string {
  const labels: Record<string, string> = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SP.ATK",
    "special-defense": "SP.DEF",
    speed: "SPD",
  };

  return labels[name] ?? name.toUpperCase();
}
