import { useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { getPersonWithCredits, type PersonWithCredits } from "../service/personDEtailService";
import { useFetch } from "../../../shared/hooks";
import { getImageUrlOrPlaceholder } from "../../../shared/utils/tmdbImage";

export function ActorDetailPage() {
  const { id = ""} = useParams<{id: string}>()
  const fetchPerson = useCallback(() => getPersonWithCredits(id), [id])
  const { data, loading, error} = useFetch<PersonWithCredits>(fetchPerson)

  if (loading) return <p className="p-6 text-text-muted">Cargando..</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!data) return <p className="p-6 text-text-main">Actor no encontrado</p>;

 const {person, credits} = data

  return (
    <div className="p-4 text-text-main md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <img src={getImageUrlOrPlaceholder(person.profile_path, "w342")} alt={person.name} className="h-64 w-48 rounded-lg object-cover"/>
        <div>
          <h1 className="text-2xl font-bold">{person.name}</h1>
          {person.place_of_birth && (
            <p className="mt-1 text-text-muted">{person.place_of_birth}</p>
          )}
          <p className="mt-3 text-text-main">{person.biography || "No hay biografia disponible"}</p>
        </div>
      </div>
      <h2 className="mt-6 text-xl font-semibold">Peliculas</h2>
      <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {credits.cast.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <img
              src={
                getImageUrlOrPlaceholder(movie.poster_path, "w342")
              }
              alt={movie.title}
              className="h-48 w-full rounded object-cover"
            />
            <p className="mt-1 truncate text-sm">{movie.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
