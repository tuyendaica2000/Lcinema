
interface genres {
    id: number,
    name: string,
}

interface Episode {
    name: string,
    still_path: string,
    air_date: string,
    episode_number: number,
}

export interface Seasons {
    air_date: string,
    episode_count?: number,
    name: string,
    poster_path: string,
    season_number: number,
    episodes?: Episode[],
}

export interface Trailer {
    name: string,
    site: string,
    key: string,
}

export interface Movie {
    original_title: string,
    id: number,
    title?: string,
    name?: string,
    overview: string,
    release_date: string,
    genre_ids?: number[] | object[],
    genres?: genres[],
    backdrop_path: string,
    poster_path: string,
    media_type: 'movie' | 'tv',
    seasons: Seasons[]
}


