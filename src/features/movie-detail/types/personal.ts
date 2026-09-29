export interface PersonalDetail{
    id: number;
    name: string;
    profile_path: string | null;
    place_of_birth: string | null;
    biography: string
}

export interface PersonMovieCredits{
    id:number;
    title: string;
    poster_path: string | null;
    character?: string;
    job?: string;
}

export interface PersonalCredits{
    cast: PersonMovieCredits[];
    crew: PersonMovieCredits[];
}