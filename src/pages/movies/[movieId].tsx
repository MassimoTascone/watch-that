import { Layout } from "@/components/Layout/Layout";
import Image from "next/image";

export default function MovieDetails({ movieDetails }) {
  console.log(movieDetails);
  const imageUrl = movieDetails?.poster_path;
  return (
    <Layout>
      <section className="min-h-screen flex flex-col  items-center">
        <h2 className="text-2xl">{movieDetails.title}</h2>
        <h3>{movieDetails.original_title}</h3>
        <p>{movieDetails.overviews}</p>
        <Image
          src={`https://image.tmdb.org/t/p/w500/${imageUrl}`}
          width={300}
          height={300}
          alt={movieDetails.title}
          priority={true}
        />

        <section>
          <p>More infos:</p>
          <p>About : {movieDetails.overview}</p>
        </section>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  console.log(context.query);
  const { movieId } = context.query;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`
    );
    const movieDetails = await res.json();

    return {
      props: {
        movieDetails,
      },
    };
  } catch (error) {
    console.log("Error fetching movie data:", error);
    return {
      props: {
        movieData: null,
      },
    };
  }
}
