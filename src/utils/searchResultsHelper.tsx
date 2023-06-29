export const fetchSearchResults = async (searchTerm: string, setter: any) => {
  try {
    const res = await fetch(`/api/getSearchResults?searchTerm=${searchTerm}`);
    const data = await res.json();
    const SearchResults = data.results;
    setter(SearchResults);
  } catch (error) {
    console.log("Error fetching movie data:", error);
  }
};
