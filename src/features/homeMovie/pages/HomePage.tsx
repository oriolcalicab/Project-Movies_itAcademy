import { useCallback, useEffect, useState } from "react";
import type { Genre } from "../../../shared/types/movie";
import { MovieCard } from "../components/MovieCard";
import {
  getGenres,
  getMoviesByGenre,
  getPopularMovies,
  searchMovies,
} from "../service/exploreService";
import { SearchBar } from "../components/SearchBar";
import { GenreFilter } from "../components/GenreFilter";
import { useDebounce, useFetch } from "../../../shared/hooks";
import type { MovieList } from "../types/MovieList";


export function HomePage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 400);

  useEffect(() => {
    getGenres()
      .then((data) => setGenres(data.genres))
      .catch(() => {});
  }, []);

  const fetchMovies = useCallback(() => {
    if (debouncedQuery) return searchMovies(debouncedQuery);
    if (selectedGenre) return getMoviesByGenre(selectedGenre);
    return getPopularMovies();
  }, [debouncedQuery, selectedGenre]);

  const { data, loading, error } = useFetch<MovieList>(fetchMovies);

  const movies = data?.results ?? [];

  return (
    <div className="p-4 md:p-6">
      <h1 className="mb-6 text-2xl font-bold text-text-muted">
        Descubrir nuevas películas
      </h1>

      <div className="mb-10 flex flex-col gap-3 sm:flex-row">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          onChange={setSelectedGenre}
        />
      </div>

      {loading && <p className="text-text-muted">Cargando...</p>}
      {error && (
        <p role="alert" className="text-red-500">
          {error}
        </p>
      )}

      {!loading && !error && movies.length === 0 && (
        <p className="text-text-muted">No se encuentrant resultados</p>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
