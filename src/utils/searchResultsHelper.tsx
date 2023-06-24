interface searchResult {
  results: {
    adult: boolean;
    backdrop_path: string;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[];
}

export const fetchSearchResults = async (searchTerm, setter) => {
  try {
    const res = await fetch(`/api/getSearchResults?searchTerm=${searchTerm}`);
    const data = await res.json();
    const SearchResults = data.results;
    setter(SearchResults);
  } catch (error) {
    console.log("Error fetching movie data:", error);
  }
};
