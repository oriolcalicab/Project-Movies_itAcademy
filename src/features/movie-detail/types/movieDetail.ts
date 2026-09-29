import type { Movie } from "../../../shared/types/movie";

export interface MovieDetail extends Movie{
    runtime: number;
    genre: {id: string, name: string} [];
    backdrop_path: string | null
}
export interface CastMember{
    id: number;
    name:string;
    character:string;
    profile_path:string | null;
}

export interface CrewMenber{
    id: number;
    name: string;
    job:string;
    profile_path: string | null;
}
export interface Credits{
    cast: CastMember[]
    crew: CrewMenber[]
}