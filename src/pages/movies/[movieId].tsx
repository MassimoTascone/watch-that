import { Layout } from "@/components/Layout/Layout";
import Image from "next/image";

export default function MovieDetails({ movieDetails }) {
  console.log(movieDetails);
  const imageUrl = movieDetails?.poster_path;
  const bgImg = `https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`;

  return (
    <Layout>
      <section>
        <Image
          id="heroImg"
          src={bgImg}
          alt="bg-img"
          fill
          className="absolute top-0 left-0 -z-10 w-full brightness-50"
        />
      </section>
      <section className="min-h-screen text-white grid grid-cols-3 grid-row-1 mx-12 mb-20 mt-40 justify-center">
        <div className="place-items-center">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${imageUrl}`}
            width={300}
            height={300}
            alt={movieDetails.title}
            priority={true}
            className="rounded-lg"
          />
        </div>
        <div className="p-3 mt-10">
          <h2 className="text-3xl font-sans font-extrabold ">
            {movieDetails.title}
          </h2>
          <p className="font-sm">
            Original title: {movieDetails.original_title}
          </p>
          <div className="flex items-center gap-3 mt-10">
            <p className="">Movie ({movieDetails.release_date}) &#x2022;</p>
            <p>{movieDetails.runtime} min</p>
          </div>
          <p className="mt-10 text-sm leading-loose">{movieDetails.overview}</p>
          <div>
            <h3>Details</h3>
            <p>Genre</p>
          </div>
        </div>
        <div className="p-3 ml-20 mt-10">
          <h2 className="font-bold text-lg">Cast and Crew:</h2>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
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
