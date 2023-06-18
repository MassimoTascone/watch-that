import { Layout } from "@/components/Layout/Layout";

export default function Movies() {
  return (
    <Layout>
      <main className="min-h-screen">
        <h2>Movies</h2>
      </main>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
    );
    const allMoviesData = await res.json();

    console.log({ allMoviesData });

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
