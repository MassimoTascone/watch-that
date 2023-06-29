import { allMoviesType } from "@/types/allMovies.type";

interface fetchMoreMediaProps {
  page: number;
  setterMedia: React.Dispatch<React.SetStateAction<any | null>>;
  setterPage: React.Dispatch<React.SetStateAction<number>>;
  apiRoute: string;
}

export const fetchMoreMedia = async ({
  page,
  setterMedia,
  setterPage,
  apiRoute,
}: fetchMoreMediaProps) => {
  try {
    const res = await fetch(`/api/${apiRoute}?page=${page + 1}`);
    const data = await res.json();
    const newMedia = data.results;
    setterMedia((prevMedia: any) => [...prevMedia, ...newMedia]);
    setterPage((prevPage) => prevPage + 1);
  } catch (error) {
    console.log("Error fetching movie data:", error);
  }
};
