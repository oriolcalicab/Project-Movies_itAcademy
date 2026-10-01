export interface HttpError extends Error{
    status: number
}

export function createHttpError(status: number): HttpError{
    const error= new Error(`HHTP ${status}`) as  HttpError;
    error.name = "HttpError"
    error.status = status;
    return error 
    
}

export function isHttpError(error: unknown): error is HttpError{
    return error instanceof Error && error.name === "HttpError" && "status" in error;
}