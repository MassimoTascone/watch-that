import { Inter } from "next/font/google";
import DisplayMovies from "@/components/DisplayMovies";
import { Layout } from "@/components/Layout/Layout";
import { HeroBanner } from "@/components/HeroBanner";
import { MovieDataResponse } from "@/types/movieData.type";

interface InitialDataProps {
  popularData: MovieDataResponse;
  upcomingData: MovieDataResponse;
  topRatedData: MovieDataResponse;
}

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  popularData,
  upcomingData,
  topRatedData,
}: InitialDataProps) {
  return (
    <>
      <Layout>
        <HeroBanner moviesData={popularData} />
        <main
          className={`flex min-h-screen flex-col items-center justify-between p-5 lg:p-24 ${inter.className}`}
        >
          <DisplayMovies moviesData={popularData} title={"Popular right now"} />
          <DisplayMovies moviesData={upcomingData} title={"Upcoming Movies"} />
          <DisplayMovies moviesData={topRatedData} title={"Best rated"} />
        </main>
      </Layout>
    </>
  );
}

export const getServerSideProps = async () => {
  try {
    const [popularRes, upcomingRes, topRatedRes] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}`
      ),
    ]);

    const popularData = await popularRes.json();
    const upcomingData = await upcomingRes.json();
    const topRatedData = await topRatedRes.json();

    console.log({ popularData, upcomingData, topRatedData });

    return { props: { popularData, upcomingData, topRatedData } };
  } catch (error) {
    console.log("Error fetching movie data:", error);
    return {
      props: { popularData: null, upcomingData: null, topRatedData: null },
    };
  }
};
