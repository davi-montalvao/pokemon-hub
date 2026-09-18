import Link from "next/link";
import { Panel } from "@/components/Panel";

export default function NotFound() {
  return (
    <Panel title="Não encontrado">
      <p className="mb-6 text-sm leading-relaxed text-ink-muted sm:text-base">
        Esse Pokémon não foi encontrado no Pokemon Hub.
      </p>
      <Link href="/" className="btn btn-primary px-4 py-2.5 text-sm">
        Voltar ao início
      </Link>
    </Panel>
  );
}
