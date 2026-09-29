import type { Genre } from "../../../shared/types/movie";

interface Props {
  genres: Genre[];
  selectedGenre: string;
  onChange: (genreId: string) => void;
}

export function GenreFilter({ genres, selectedGenre, onChange }: Props) {
  return (
    <select
      value={selectedGenre}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filtar por generos"
      className="rounded-lg bg-card-bg px-4 py-2 text-text-main"
    >
      <option value="">Todos los generos</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  );
}
