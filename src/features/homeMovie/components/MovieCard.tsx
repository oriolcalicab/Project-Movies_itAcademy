import { Link } from "react-router-dom";
import type { Movie } from "../../../shared/types/movie";
import { getImageUrlOrPlaceholder } from "../../../shared/utils/tmdbImage";

interface Props {
  movie: Movie;
}



export function MovieCard({ movie }: Props) {
  const postUrl = getImageUrlOrPlaceholder(movie.poster_path, "w342") 
  

  const year = movie.release_date ? movie.release_date.slice(0, 4) : "/";

  return (
    <Link to={`/movie/${movie.id}`} className="block rounded-lg bg-card-bg overflow-hidden transition-transform hover:scale-100 hover:border-2 border-btn-primary">
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
