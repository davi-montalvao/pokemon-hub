import { FavoritesList } from "@/components/FavoritesList";
import { Panel } from "@/components/Panel";

export default function FavoritesPage() {
  return (
    <Panel title="Favoritos">
      <p className="mb-6 text-sm text-ink-muted sm:text-base">
        Seus Pokémon salvos neste navegador.
      </p>
      <FavoritesList />
    </Panel>
  );
}
