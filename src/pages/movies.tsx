import { Layout } from "@/components/Layout/Layout";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Movies({ allMoviesData }) {
  const [movies, setMovies] = useState(allMoviesData?.results);
  const [page, setPage] = useState(1);

  const fetchMoreMovies = async () => {
    try {
      const res = await fetch(`/api/getMovies?page=${page + 1}`);
      const data = await res.json();
      const newMovies = data.results;
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.log("Error fetching movie data:", error);
    }
  };

  console.log(allMoviesData);
  console.log(page);
  return (
    <Layout>
      <section className="min-h-screen mb-20">
        <div>
          <h2 className="text-center font-bold text-white text-2xl mb-4">
            All Movies
          </h2>
          <div className="flex flex-wrap gap-5 justify-center my-10">
            {movies?.map((movie: any) => (
              <Link href={`movies/${movie.id}`} key={movie.id}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  width={200}
                  height={200}
                  className="hover:brightness-50 rounded-lg drop-shadow-lg"
                  priority={true}
                />
              </Link>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              className="btn btn-outline btn-accent"
              onClick={() => fetchMoreMovies()}
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
  console.log(context.query);
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
