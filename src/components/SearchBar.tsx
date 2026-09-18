"use client";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchBar({
  value,
  onChange,
  placeholder = "Buscar Pokémon...",
}: SearchBarProps) {
  return (
    <label className="block w-full">
      <span className="mb-2 block text-sm font-medium text-ink">Busca</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="field text-sm sm:text-base"
      />
    </label>
  );
}
