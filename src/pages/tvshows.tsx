import { Layout } from "@/components/Layout/Layout";
import { useState } from "react";
import { MediaListDisplay } from "@/components/MediaListDisplay";
import { fetchMoreMedia } from "@/utils/loadMoreMediaHelper";

export default function TvShows({ alltvShowsData }) {
  const [tvShows, setTvShows] = useState(alltvShowsData?.results);
  const [page, setPage] = useState(1);

  console.log(alltvShowsData);
  return (
    <Layout>
      <section className="min-h-screen mb-20">
        <div>
          <h2 className="text-center font-bold text-white text-2xl mb-4">
            All Tv Shows
          </h2>
          <MediaListDisplay mediaData={tvShows} mediaType={"tvshows"} />
          <div className="flex justify-center">
            <button
              className="btn btn-outline btn-accent"
              onClick={() =>
                fetchMoreMedia({
                  page,
                  setterMedia: setTvShows,
                  setterPage: setPage,
                  apiRoute: "getTvShows",
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

export const getServerSideProps = async (context) => {
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
