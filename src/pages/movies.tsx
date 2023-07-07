import { useState } from "react";
import { Layout } from "@/components/Layout/Layout";
import { MediaListDisplay } from "@/components/MediaListDisplay";
import { fetchMoreMedia } from "@/utils/loadMoreMediaHelper";
import { allMoviesType } from "@/types/allMovies.type";

interface allMoviesDataType {
  allMoviesData: {
    page: number;
    results: allMoviesType[];
  };
}

export default function Movies({ allMoviesData }: allMoviesDataType) {
  const [movies, setMovies] = useState(allMoviesData?.results);
  const [page, setPage] = useState(1);

  return (
    <Layout>
      <section className="min-h-screen mb-20">
        <div>
          <h2 className="text-center font-bold text-white text-2xl mb-4">
            All Movies
          </h2>
          <MediaListDisplay mediaData={movies} mediaType={"movies"} />
          <div className="flex justify-center">
            <button
              className="btn btn-outline btn-accent"
              onClick={() =>
                fetchMoreMedia({
                  page,
                  setterMedia: setMovies,
                  setterPage: setPage,
                  apiRoute: "getMovies",
                })
              }
            >
              View More
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps = async (context: any) => {
  const { page } = context.query;
  try {
    const resAllMovies = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${process.env.API_KEY}`
    );
    const allMoviesData = await resAllMovies.json();

    return {
      props: {
        allMoviesData,
      },
    };
  } catch (error) {
    console.log("Error fetching movie data:", error);
    return {
      props: {
        allMoviesData: null,
      },
    };
  }
};
