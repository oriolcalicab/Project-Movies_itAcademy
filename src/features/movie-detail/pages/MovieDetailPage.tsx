import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Credits, MovieDetail } from "../types/movieDetail";
import noPosterImage from "../../../assets/no-poster.jpg"

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [credits, setCredits] = useState<Credits | null>(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-ES`;

        const response = await fetch(url);
        const data = await response.json();

        setMovie(data);
      } catch {
        setError("No s'ha pogut carregar la pel·lícula.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  useEffect(() => {
    async function fetchCredits() {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=es-ES`;

        const response = await fetch(url);
        const data = await response.json();

        setCredits(data);
      } catch {
        setError("No s'ha pogut carregar");
      }
    }

    fetchCredits();
  }, [id]);

  if (isLoading) return <p>Carregant</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Pelicula no encontrada</p>;

  const director = credits?.crew.find((person) => person.job === "Director");
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;
  const directorPhotoUrl = director?.profile_path
    ? `https://image.tmdb.org/t/p/w185${director.profile_path}`
    : noPosterImage;

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
              src={directorPhotoUrl}
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
        <h2 className="mt-6 text-xl font-semibold">Repartiment</h2>
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
