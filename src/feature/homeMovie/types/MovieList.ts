import type { Movie } from "../../../shared/types/movie";

export interface MovieList{
    page: number,
    result: Movie[],
    total_page: number,
    total_result: number
}