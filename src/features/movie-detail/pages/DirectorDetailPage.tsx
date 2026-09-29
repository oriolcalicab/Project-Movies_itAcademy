import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { PersonalCredits, PersonalDetail } from "../types/personal";
import noPosterImg from "../../../assets/no-poster.jpg"

export function DirectorDetailPage(){
    const {id} = useParams<{id: string}>()
    const [person, setPerson] = useState<PersonalDetail | null>(null);
    const [credits, setCredits] = useState<PersonalCredits | null>(null);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("");

    useEffect(() =>{
        async function fetchPerson() {
            try{
                const apiKey = import.meta.env.VITE_TMDB_API_KEY;
                const url = `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=es-ES`;

                const response = await fetch(url);
                const data = await response.json()

                setPerson(data)
            }catch{
                setError("No se ha podido cargar la pagina del director")
            }finally{
                setIsLoading(false)
            }
        }
        fetchPerson()
    },[id])

     useEffect(() => {
    async function fetchCredits() {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apiKey}&language=ca-ES`;

        const response = await fetch(url);
        const data = await response.json();

        setCredits(data);
      } catch {
        setError("No se ha podido cargar")
      }
    }

    fetchCredits();
  }, [id]);

  
  if (isLoading) return <p className="p-6 text-text-muted">Cargando...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!person) return <p className="p-6 text-text-main">Director no encontrado</p>;

   const photoUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w342${person.profile_path}`
    : noPosterImg;

  const directedMovies = credits?.crew.filter((movie) => movie.job === "Director") ?? [];

  return(
    <div className="p-4 text-text-main md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row">
            <img src={photoUrl} alt={person.name} className="h-64 w-48 rounded-lg object-cover"/>

            <div>
                <h1 className="text-2xl font-bold">{person.name}</h1>
                {person.place_of_birth && (
                    <p className="mt-1 text-text-muted">{person.place_of_birth}</p>
                )}
                <p className="mt-3 text-text-main">{person.biography || "Sin biografia disponible"}</p>
            </div>
        </div>

        <h2 className="mt-6 text-xl font-semibold">Peliculas dirigidas</h2>
        <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {directedMovies.map((movie) =>(
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                    <img src={ movie.poster_path
                  ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                  : noPosterImg} alt={movie.title} className="h-48 w-full rounded object-cover"/>
                  <p className="mt-1 truncate text-sm">{movie.title}</p>
                </Link>
            ))}
        </div>
    </div>
  )



}