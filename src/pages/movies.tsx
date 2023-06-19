import { Layout } from "@/components/Layout/Layout";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Movies({ allMoviesData }) {
  const [movies, setMovies] = useState(allMoviesData?.results);

  console.log(movies);
  return (
    <Layout>
      <main className="min-h-screen">
        <h2>Movies</h2>

        <section>
          <div className="flex flex-wrap gap-5 justify-center">
            {allMoviesData?.results?.map((movie) => (
              <Link href={`movies/${movie.id}`} key={movie.id}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  width={200}
                  height={200}
                  className="hover:brightness-50 rounded-lg drop-shadow-lg"
                />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  try {
    const resAllMovies = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${process.env.API_KEY}`
    );
    const allMoviesData = await resAllMovies.json();

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
