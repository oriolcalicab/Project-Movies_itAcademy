import { tmdbFetch } from "../../../shared/service/tmdbClient";
import type { PersonalDetail, PersonalCredits } from "../types/personal";


export interface PersonWithCredits{
    person: PersonalDetail;
    credits: PersonalCredits;
}
export function getPersonDetail(id: string) {
  return tmdbFetch<PersonalDetail>(`/person/${id}`);
}

export function getPersonCredits(id: string) {
  return tmdbFetch<PersonalCredits>(`/person/${id}/movie_credits`);
}


export async function getPersonWithCredits(id:string): Promise<PersonWithCredits> {
    const [person, credits] = await Promise.all([getPersonDetail(id), getPersonCredits(id)])
    return {person, credits }
}