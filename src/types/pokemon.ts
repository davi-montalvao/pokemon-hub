export type PokemonListItem = {
  name: string;
  url: string;
};

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
};

export type PokemonTypeRef = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type PokemonSprites = {
  front_default: string | null;
  other?: {
    "official-artwork"?: {
      front_default: string | null;
    };
  };
};

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonTypeRef[];
  stats: PokemonStat[];
  sprites: PokemonSprites;
};

export type TypeListResponse = {
  results: { name: string; url: string }[];
};

export type TypeDetailResponse = {
  pokemon: {
    pokemon: PokemonListItem;
    slot: number;
  }[];
};

export type FavoritePokemon = {
  id: number;
  name: string;
};
