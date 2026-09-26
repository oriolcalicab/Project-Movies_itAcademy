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

    const year = movie.release_date ? movie.release_date.slice(0, 4) : "/" 

    return(
        <Link
        to={`/movie/${movie.id}`}>
            <img src={postUrl} alt={movie.title} />

            <div>
                <h3>{movie.title}</h3>
                <div>
                    <span>{year}</span>
                    <span> ⭐ {movie.vote_average.toFixed(1)}</span>
                </div>
            </div>
        </Link>
    )
}
