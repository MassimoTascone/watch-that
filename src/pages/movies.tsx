import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout/Layout";
import { MediaListDisplay } from "@/components/MediaListDisplay";
import { fetchMoreMedia } from "@/utils/loadMoreMediaHelper";
import { allMoviesType } from "@/types/allMovies.type";
import { Pagination } from "@/components/Pagination";

interface allMoviesDataType {
  allMoviesData: {
    page: number;
    results: allMoviesType[];
    total_pages: number;
  };
}

export default function Movies({ allMoviesData }: allMoviesDataType) {
  const [movies, setMovies] = useState(allMoviesData?.results);
  const [page, setPage] = useState(1);

  console.log({ page });

  const handlePageChange = (newValue: number) => {
    console.log({ newValue });
    setPage(newValue);
  };

  useEffect(() => {
    fetchMoreMedia({
      page: page,
      setterMedia: setMovies,
      setterPage: setPage,
      apiRoute: "getMovies",
    });
  }, [page]);

  return (
    <Layout>
      <section className="min-h-screen mb-20">
        <div>
          <h2 className="text-center font-bold text-white text-2xl sm:text-5xl mb-4">
            Movies
          </h2>
          <div className="flex justify-center">
            <Pagination
              IncomingTotalPages={allMoviesData.total_pages}
              handlePageChange={handlePageChange}
            />
          </div>
          <MediaListDisplay mediaData={movies} mediaType={"movies"} />
          <div className="flex justify-center">
            <Pagination
              IncomingTotalPages={allMoviesData.total_pages}
              handlePageChange={handlePageChange}
            />
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
