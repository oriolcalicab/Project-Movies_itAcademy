import { tmdbFetch } from "../../../shared/service/tmdbClient";
import type { Credits, MovieDetail } from "../types/movieDetail";

export interface MovieWithCredits{
    movie: MovieDetail;
    credits: Credits;
}

export function getMovieDetail(id: string){
    return tmdbFetch<MovieDetail>(`/movie/${id}`)
}

export function getMovieCredits(id: string){
    return tmdbFetch<Credits>(`/movie/${id}/credits`)
}

export async function getMovieWithCredits(id: string): Promise<MovieWithCredits>{
    const [movie, credits] = await Promise.all([getMovieDetail(id), getMovieCredits(id)])
    return {movie, credits}
}