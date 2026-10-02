import { tmdbFetch } from "../../../shared/service/tmdbClient";
import type { Credits, MovieDetail } from "../types/movieDetail";

export interface MovieWitchCredits{
    movie: MovieDetail;
    credits: Credits;
}

export function getMovieDetail(id: string){
    return tmdbFetch<MovieDetail>(`/movie/${id}`)
}

export function getMovieCredits(id: string){
    return tmdbFetch<Credits>(`/movie/${id}/credits`)
}

export async function getMovieWitchCredits(id: string): Promise<MovieWitchCredits>{
    const [movie, credits] = await Promise.all([getMovieDetail(id), getMovieCredits(id)])
    return {movie, credits}
}