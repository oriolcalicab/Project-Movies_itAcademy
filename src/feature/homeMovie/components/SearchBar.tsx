interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Buscar peliculas"
      aria-label="Buscar peliculas"
      className="  rounded-lg px-4 py-2 text-text-main placeholder-text-muted bg-card-bg sm:w-full"
    />
  );
}
