import { Link } from "react-router-dom";
import type { Movie } from "../../../shared/types/movie";

interface Props {
  movie: Movie;
}

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w342";

export function MovieCard({ movie }: Props) {
  const postUrl = movie.poster_path
    ? `${POSTER_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/342x513?text=No+Poster";

  const year = movie.release_date ? movie.release_date.slice(0, 4) : "/";

  return (
    <Link to={`/movie/${movie.id}`} className="blok rounded-lg bg-card-bg overflow-hidden transition-transform hover:scale-100 hover:border-2 border-btn-primary">
      <img
        src={postUrl}
        alt={movie.title}
        className="h-64 w-full object-cover"
      />

      <div className="p-3">
        <h3 className="truncate font-semibold text-text-main">{movie.title}</h3>
        <div className="mt-1 flex items-center justify-between text-sm text-text-muted">
          <span>{year}</span>
          <span> ⭐ {movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
