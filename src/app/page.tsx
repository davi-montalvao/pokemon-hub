import { Suspense } from "react";
import { Curiosidades } from "@/components/Curiosidades";
import { Panel } from "@/components/Panel";
import { PokemonExplorer } from "@/components/PokemonExplorer";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <Panel title="Curiosidades">
        <p className="mb-4 text-sm text-ink-muted sm:mb-5 sm:text-base">
          Toque em um card para ver a lista completa.
        </p>
        <Curiosidades />
      </Panel>

      <div id="explorar">
        <Panel title="Explorar">
          <p className="mb-6 text-sm text-ink-muted sm:text-base">
            Explore, filtre por tipo e salve seus favoritos.
          </p>
          <Suspense
            fallback={
              <p className="rounded-xl border border-border bg-surface-muted px-4 py-10 text-center text-sm text-ink-muted">
                Carregando Pokemon Hub...
              </p>
            }
          >
            <PokemonExplorer />
          </Suspense>
        </Panel>
      </div>
    </div>
  );
}
