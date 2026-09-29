import { useEffect, useState } from "react";
import type { Genre, Movie } from "../../../shared/types/movie";
import { MovieCard } from "../components/MovieCard";
import {
  getGenres,
  getMoviesByGenre,
  getPopularMovies,
  searchMovies,
} from "../service/exploreService";
import { SearchBar } from "../components/SearchBar";
import { GenreFilter } from "../components/GenreFilter";

export function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getGenres()
      .then((data) => setGenres(data.genres))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const request = searchQuery
      ? searchMovies(searchQuery)
      : selectedGenre
        ? getMoviesByGenre(selectedGenre)
        : getPopularMovies();

        request
        .then((data)=> setMovies(data.results))
        .catch(() => setError("No se han podido cargar las peliculas"))
        .finally(() => setIsLoading(false))
  }, [searchQuery, selectedGenre]);

  return (
    <div className="p-4 md:p-6">
      <h1 className="mb-6 text-2xl font-bold text-text-muted">
        Descubrir nuevas películas
      </h1>

      <div className="mb-10 flex flex-col gap-3 sm:flex-row">
        <SearchBar 
        value={searchQuery}
        onChange={(value: string) =>{
            setIsLoading(true)
            setError(null)
            setSearchQuery(value)
        }}
        />
        <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        onChange={(value: string) =>{
            setIsLoading(true)
            setError(null)
            setSelectedGenre(value)            
        }} 
        />
      </div>

      {isLoading && <p className="text-text-muted">Cargando...</p>}
      {error &&( <p role="alert" className="text-red-500">{error}</p>)}

      {!isLoading && !error && movies.length === 0 &&(
        <p className="text-text-muted">No se encuentrant resultados</p>
      )}

     
      {!isLoading && !error && movies.length > 0 && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
     
    </div>
  );
}
