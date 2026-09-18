import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "Pokemon Hub",
  description: "Explore o Pokemon Hub, filtre por tipo e salve seus favoritos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${syne.variable} h-full`}>
      <body className={`${outfit.className} min-h-full antialiased`}>
        <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col px-4 py-6 sm:px-6 sm:py-8">
          <Header />
          <main className="animate-fade-up flex-1">{children}</main>
          <footer className="mt-10 pb-2 text-center text-sm text-ink-muted">
            Dados da PokéAPI · Feito para portfólio
          </footer>
        </div>
      </body>
    </html>
  );
}
