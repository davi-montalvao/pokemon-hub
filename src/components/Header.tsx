import Link from "next/link";

export function Header() {
  return (
    <header className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <Link
          href="/"
          className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
        >
          Pokemon <span className="text-accent">Hub</span>
        </Link>
        <p className="mt-2 max-w-md text-sm text-ink-muted sm:text-base">
          Explore o Pokemon Hub e salve seus favoritos.
        </p>
      </div>

      <nav className="flex gap-2">
        <Link href="/" className="btn btn-primary px-4 py-2.5 text-sm">
          Explorar
        </Link>
        <Link href="/favorites" className="btn px-4 py-2.5 text-sm">
          Favoritos
        </Link>
      </nav>
    </header>
  );
}
