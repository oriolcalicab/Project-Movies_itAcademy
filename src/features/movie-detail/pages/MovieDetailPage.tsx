import { useCallback} from "react";
import { Link, useParams } from "react-router-dom";
import noPosterImage from "../../../assets/no-poster.jpg"
import { useFetch } from "../../../shared/hooks";
import { getMovieWithCredits, type MovieWithCredits } from "../service/movieDetailService";
console.log("és un mock?", vi.isMockFunction(getMovieWithCredits));
import { getImageUrl, getImageUrlOrPlaceholder } from "../../../shared/utils/tmdbImage";
import { vi } from "vitest";

export function MovieDetailPage() {
  const {id = "" } = useParams<{id: string}>() 
  const fetchMovie = useCallback(() => getMovieWithCredits(id), [id])
  const {loading, error, data} = useFetch<MovieWithCredits>(fetchMovie)

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>Pelicula no encontrada</p>;

  const {movie, credits} = data;
  const director = credits.crew.find((person) => person.job === "Director")
  const backdropUrl = getImageUrl(movie.backdrop_path, "w1280")


  return (
    <div className="text-text-main">
      {backdropUrl && (
        <div
          className="h-56 w-full bg-cover bg-center md:h-80"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        />
      )}

      <div className="p-4 md:p-6">
        <h1 className="text-2xl font-black">{movie.title}</h1>
        <p className="mt-1 text-text-muted">
          {movie.release_date.slice(0, 4)} - {movie.runtime} min
        </p>
        <p className="mt-4 text-center text-text-muted lg:text-2xl">
          {movie.overview}
        </p>

        {director && (
          <div className="mt-4 flex items-center gap-3">
            <Link
                to={`/director/${director.id}`}
                key={director.id}>
            <img
              src={getImageUrlOrPlaceholder(director.profile_path, "w185")}
              alt={director.name}
              className="h-32 w-24 rounded object-cover"
            />
            </Link>
            <div>
              <p className="text-text-main">Director</p>
              <Link
                to={`/director/${director.id}`}
                className="font-semibold text-brand-primary hover:underline"
              >
                {director.name}
              </Link>
            </div>
          </div>
        )}
        <h2 className="mt-6 text-xl font-semibold">Reparto</h2>
        <div className="mt-2 flex gap-4 overflow-x-auto">
          {credits?.cast.slice(0, 10).map((actor) => (
            <Link
              key={actor.id}
              to={`/actor/${actor.id}`}
              className="w-24 shrink-0 text-center"
            >
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : noPosterImage
                }
                alt={actor.name}
                className="h-32 w-24 rounded object-cover"
              />
              <p className="mt-1 text-xs">{actor.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
