import { useEffect, useState } from "react";
import type { Movie } from "../../../shared/types/movie";
import { MovieCard } from "../components/MovieCard";

export function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);  

  useEffect(() => {
    async function fetchMovies() {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES`;

        const response = await fetch(url);
        const data = await response.json();

        setMovies(data.results);
      } catch {
        return "No se han podido cargar las peliculas";
      }
    }
    fetchMovies();
  }, []);

  return (
    <div className="p-4 md:p-6">
      <h1 className="mb-6 text-2xl font-bold text-text-muted">Descubrir nuevas películas</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
