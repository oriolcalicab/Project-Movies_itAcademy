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
    <div>
      <h1>Descubrir nuevas películas</h1>

      <div>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
