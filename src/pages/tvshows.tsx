import { Layout } from "@/components/Layout/Layout";
import { useState, useEffect } from "react";
import { MediaListDisplay } from "@/components/MediaListDisplay";
import { fetchMoreMedia } from "@/utils/loadMoreMediaHelper";
import { allTvShowsType } from "@/types/allTvShows.type";
import { Pagination } from "@/components/Pagination";

interface alltvShowsDataType {
  alltvShowsData: {
    results: allTvShowsType[];
    total_pages: number;
  };
}

export default function TvShows({ alltvShowsData }: alltvShowsDataType) {
  const [tvShows, setTvShows] = useState(alltvShowsData?.results);
  const [page, setPage] = useState(1);

  const handlePageChange = (newValue: number) => {
    setPage(newValue);
  };

  useEffect(() => {
    fetchMoreMedia({
      page: page,
      setterMedia: setTvShows,
      setterPage: setPage,
      apiRoute: "getTvShows",
    });
  }, [page]);

  return (
    <Layout>
      <section className="min-h-screen mb-20">
        <div>
          <h2 className="text-center font-bold text-white text-2xl sm:text-5xl mb-4 uppercase">
            Tv Shows
          </h2>
          <div className="flex justify-center">
            <Pagination
              IncomingTotalPages={alltvShowsData.total_pages}
              handlePageChange={handlePageChange}
            />
          </div>
          <MediaListDisplay mediaData={tvShows} mediaType={"tvshows"} />
          <div className="flex justify-center">
            <Pagination
              IncomingTotalPages={alltvShowsData.total_pages}
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
    const resAlltvShows = await fetch(
      `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=vote_count.desc&api_key=${process.env.API_KEY}`
    );
    const alltvShowsData = await resAlltvShows.json();

    return {
      props: {
        alltvShowsData,
      },
    };
  } catch (error) {
    console.log("Error fetching movie data:", error);
    return {
      props: {
        alltvShowsData: null,
      },
    };
  }
};
