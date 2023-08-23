export const fetchSearchResults = async (
  searchTerm: string,
  setter: any,
  loadingSetter: any
) => {
  try {
    loadingSetter(true);
    const res = await fetch(`/api/getSearchResults?searchTerm=${searchTerm}`);
    const data = await res.json();
    const SearchResults = data.results;
    setter(SearchResults);
    loadingSetter(false);
  } catch (error) {
    console.log("Error fetching movie data:", error);
  }
};
