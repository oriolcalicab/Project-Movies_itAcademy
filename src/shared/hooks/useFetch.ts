import { useEffect, useState } from "react";
import { isHttpError } from "../service/httpError";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function getHttpMessage(status: number): string {
  if (status === 401 || status === 403) return "No tienes autorizacion";
  if (status === 404) return "No se han encontrado el recurso solicitado";
  if (status === 429) return "Muchas peticiones, vuleve a probar";
  if (status === 500) return "El servidor ha caido";
  return `LA peticion ha caido (codigo ${status})`;
}

function getErrorMessage(error: unknown): string {
  if (isHttpError(error)) return getHttpMessage(error.status);
  if (error instanceof TypeError)
    return "No se ha podido conectar con el servidor ";
  if (error instanceof SyntaxError)
    return "La respuesta del servidor no tiene un formato valido";
  if (error instanceof Error) return error.message;
  return "Se ha producido un error inesperado";
}

export function useFetch<T>(fetcher: () => Promise<T>): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetcher();
        if (!ignore) setData(result);
      } catch (err: unknown) {
        if (!ignore) {
          setData(null);
          setError(getErrorMessage(err));
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [fetcher]);

  return { data, loading, error };
}
