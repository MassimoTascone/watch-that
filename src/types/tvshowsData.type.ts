export interface tvCreditDataType{
    cast:tvCreditDataCast[],
    id: number
}
interface tvCreditDataCast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    character: string;
    credit_id: string;
    order: number;
}

export interface tvDetailsDataType {
    adult: boolean;
    backdrop_path: string;
    created_by: {
      id: number;
      credit_id: string;
      name: string;
      gender: number;
      profile_path: string;
    }[];
    episode_run_time: number[];
    first_air_date: string;
    genres: {
      id: number;
      name: string;
    }[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: {
      id: number;
      name: string;
      overview: string;
      vote_average: number;
      vote_count: number;
    };
    name: string;
    networks: {
      name: string;
      id: number;
      logo_path: string;
      origin_country: string;
    }[];
    next_episode_to_air: null;
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }[];
    production_countries: {
      iso_3166_1: string;
      name: string;
    }[];
    seasons: {
      air_date: string;
      episode_count: number;
      id: number;
      name: string;
      overview: string;
      poster_path: string;
      season_number: number;
    }[];
    spoken_languages: {
      english_name: string;
      iso_639_1: string;
      name: string;
    }[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
  }
export interface tvImagesDataType{
    backdrops: backdropsTvType,
    id: number,
}
interface backdropsTvType {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: string | null;
    vote_average: number;
    vote_count: number;
    width: number;
}