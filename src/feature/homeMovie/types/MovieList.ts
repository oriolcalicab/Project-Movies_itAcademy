import type { Movie } from "../../../shared/types/movie";

export interface MovieList{
    page: number,
    results: Movie[],
    total_page: number,
    total_result: number
}