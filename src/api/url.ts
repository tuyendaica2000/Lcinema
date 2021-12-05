import { config as dotenv } from "dotenv"

dotenv()


const API_KEY = process.env.REACT_APP_API_KEY;
export const BASE_URL= 'https://api.themoviedb.org/3/';
export const BASE_IMG= 'https://image.tmdb.org/t/p/original/'
export const DISCOVER_URL = `discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
export const DISCOVER_TV_URL = `discover/tv?sort_by=popularity.desc&api_key=${API_KEY}`;
export const SEARCH_URL = `search/movie?api_key=${API_KEY}`;
export const ID_URL = (id: string, type: string): string => {
    return `/${type}/${id}?api_key=${API_KEY}&language=en-US`
}
export const MOVIE_TOP_URL = `movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
export const TV_TOP_URL = `tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
export const RECOMMEN_URL = (id: string, type: string): string => {
    return `${type}/${id}/recommendations?api_key=${API_KEY}&language=en-US`
}
export const TRAILER_MOVIE_URL = (type: string, id: string): string => {
    return `${type}/${id}/videos?api_key=${API_KEY}&language=en-US`
}
export const EP_URL = (id: string, season: number): string => {
    return `tv/${id}/season/${season}?api_key=${API_KEY}&language=en-US`
}
export const MOVIE_GENRES = (genres: string): string => {
    return `discover/movie?api_key=${API_KEY}&with_genres=${genres}`
} 
export const TV_GENRES = (genres: string): string => {
    return `discover/tv?api_key=${API_KEY}&with_genres=${genres}`
}
export const NEW_MOVIE = `movie/now_playing?api_key=${API_KEY}&language=en-US`
export const NEW_TV = `tv/on_the_air?api_key=${API_KEY}&language=en-US`
 
export const POPULAR_GENRES = (type: string): string => {
    return `${type}/popular?api_key=${API_KEY}&language=en-US&page=1`
} 

