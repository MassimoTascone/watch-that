export interface SearchResult {
    adult: boolean;
    backdrop_path: string | null;
    id: number;
    media_type: "movie" | "tv";
    title: string;
    original_language: string;
    original_title?: string;
    overview: string;
    poster_path: string | null;
    genre_ids: number[];
    popularity: number;
    release_date?: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    first_air_date?: string;
    name?: string;
    origin_country?: string[];
    
  }