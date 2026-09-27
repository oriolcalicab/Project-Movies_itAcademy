import { tmdbFetch } from "../../../shared/service/tmdbClient";
import type { MovieList } from "../types/MovieList";
import type { Genre } from "../../../shared/types/movie";


export function getPopularMovies(page: number = 1){
    return tmdbFetch<MovieList>("/movie/popular", {
        page: String(page)
    })
}

export function getGenres(){
    return tmdbFetch<{genres: Genre[]}>("/genre/movie/list")
}

export function searchMovies(query: string, page: number = 1){
    return tmdbFetch<MovieList>("/search/movie", {
        query,
        page: String(page)
    })
}

export function getMoviesByGenre(genreId: string, page: number = 1) {
    return tmdbFetch<MovieList>("/discover/movie", {
        with_genres: genreId,
        page: String(page)
    })
}