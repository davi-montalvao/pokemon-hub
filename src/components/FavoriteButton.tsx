"use client";

import { useEffect, useState } from "react";
import { getFavorites, toggleFavorite } from "@/lib/favorites";

type FavoriteButtonProps = {
  id: number;
  name: string;
};

export function FavoriteButton({ id, name }: FavoriteButtonProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(getFavorites().some((item) => item.id === id));
  }, [id]);

  return (
    <button
      type="button"
      className={`btn px-4 py-2.5 text-sm ${active ? "btn-primary" : ""}`}
      onClick={() => {
        const next = toggleFavorite({ id, name });
        setActive(next.some((item) => item.id === id));
      }}
    >
      {active ? "★ Remover favorito" : "☆ Favoritar"}
    </button>
  );
}
