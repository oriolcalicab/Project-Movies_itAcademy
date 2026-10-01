import noPosterImage from "../../assets/no-poster.jpg"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

export  type TmdbImageSize = "w92" | "w185" | "w342" | "w500" | "w1280" | "original";

export function getImageUrl(patch: string | null | undefined, size: TmdbImageSize): string | null {
    return patch ? `${IMAGE_BASE_URL}/${size}${patch}` : null;
}

export function getImageUrlOrPlaceholder(patch: string | null | undefined, size: TmdbImageSize): string{
    return getImageUrl(patch, size) ?? noPosterImage;
}