import { tmdbFetch } from "../../../shared/service/tmdbClient";
import type { PersonalDetail, PersonalCredits } from "../types/personal";


export interface PersonWithCredits{
    person: PersonalDetail;
    credits: PersonalCredits;
}

export function getPersonalDetail(id: string) {
    return tmdbFetch<PersonalDetail>(`/personal/${id}`)
}

export function getPersonalCredits(id: string ){
    return tmdbFetch<PersonalCredits>(`/personal/${id}/movie_credits`)
}


export async function getPersonalWithCredits(id:string): Promise<PersonWithCredits> {
    const [person, credits] = await Promise.all([getPersonalDetail(id), getPersonalCredits(id)])
    return {person, credits }
}