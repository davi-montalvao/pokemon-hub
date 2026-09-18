# Pokemon Hub

Aplicação moderna para explorar Pokémon, feita com Next.js e [PokéAPI](https://pokeapi.co/).

## Por que existe

Sempre fui fã de Pokémon e passei essa paixão para a minha filha, que hoje tem 16 anos. Um dia, comendo pizza e falando sobre o assunto, ela comentou que tinha dificuldade em encontrar informações além do site oficial brasileiro. Decidi criar o Pokemon Hub para ela — e para outros fãs — reunindo busca, filtro por tipo, detalhes e favoritos em um só lugar.

Também serve como projeto de portfólio: consumo de API pública, UI limpa, favoritos no navegador e deploy pronto para Vercel.

## Features

- Listagem paginada de Pokémon
- Busca por nome (a partir da 1ª letra) ou número
- Filtro por tipo
- Página de detalhe (arte, tipos, altura, peso e stats)
- Favoritos com `localStorage`
- Visual moderno e responsivo

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- PokéAPI

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — ambiente local
- `npm run build` — build de produção
- `npm start` — sobe o build

## Deploy

1. Suba o repositório no GitHub
2. Importe o projeto na [Vercel](https://vercel.com)
3. Deploy com as configs padrão do Next.js

## Estrutura

```text
src/
  app/                 # rotas (home, detalhe, favoritos)
  components/          # UI
  lib/                 # PokéAPI + favoritos
  types/               # tipagens
```

## Créditos

- Dados: [PokéAPI](https://pokeapi.co/)
- Sprites: [PokeAPI Sprites](https://github.com/PokeAPI/sprites)
