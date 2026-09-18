import { Panel } from "@/components/Panel";
import { PokemonExplorer } from "@/components/PokemonExplorer";

export default function HomePage() {
  return (
    <Panel title="Explorar">
      <p className="mb-6 text-sm text-ink-muted sm:text-base">
        Explore, filtre por tipo e salve seus favoritos.
      </p>
      <PokemonExplorer />
    </Panel>
  );
}
