import { Layout } from "@/components/Layout/Layout";
import Image from "next/image";
import {
  formatDate,
  formatDuration,
  formatPrice,
} from "@/utils/formattingHelpers";

export default function MovieDetails({ movieDetailsData, creditData }) {
  console.log(movieDetailsData);
  console.log(creditData);

  const imageUrl = movieDetailsData?.poster_path;
  const bgImg = `https://image.tmdb.org/t/p/original/${movieDetailsData?.backdrop_path}`;

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

      <section className="min-h-screen text-white grid grid-cols-[1fr,2fr,1fr] grid-row-1 mx-12 mb-20 mt-40 justify-center">
        <div className="flex justify-center items-start">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${imageUrl}`}
            width={300}
            height={300}
            alt={movieDetailsData.title}
            priority={true}
            className="rounded-lg drop-shadow-lg"
          />
        </div>

        <div className="p-3 mt-10 ml-10">
          <div>
            <h2 className="text-3xl font-sans font-extrabold ">
              {movieDetailsData.title}
              <span className="ml-2 font-extralight">
                ({formatDate(movieDetailsData?.release_date)})
              </span>
            </h2>
            <p className="font-sm italic font-extralight">
              Original title: {movieDetailsData?.original_title}
            </p>
            <div className="flex items-center gap-3 mt-10">
              <p>Movie&nbsp; &#x2022; </p>
              <p>{formatDuration(movieDetailsData.runtime)}</p>
            </div>
            <p className="mt-10 text-base leading-loose	">
              {movieDetailsData?.overview}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-2xl mt-10 mb-5">Details</h3>
            <div className="grid grid-cols-3 grid-rows-3 divide-slate-700">
              <div className="grid-span-1 p-2 divie-y">
                <h4>Genres</h4>
              </div>
              <div className="flex gap-3 col-span-2 p-2">
                {movieDetailsData?.genres.map((genre) => (
                  <div className="badge badge-neutral truncate" key={genre.id}>
                    {genre.name}
                  </div>
                ))}
              </div>

              <div className="grid-span-1 p-2">
                <h4>Budget</h4>
              </div>
              <div className=" gap-3 col-span-2 p-2">
                <p className="font-extralight">
                  {movieDetailsData.budget === 0
                    ? "Unknown"
                    : formatPrice(movieDetailsData?.budget)}
                </p>
              </div>

              <div className="grid-span-1 p-2">
                <h4>Revenue</h4>
              </div>
              <div className="col-span-2 p-2">
                <p className="font-extralight">
                  {movieDetailsData.revenue === 0
                    ? "Unknown"
                    : formatPrice(movieDetailsData?.revenue)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 ml-10 mt-10">
          <h2 className="font-bold text-2xl">Cast and Crew:</h2>
          <ul>
            {creditData?.cast?.slice(0, 10).map((actor) => (
              <li key={actor.id} className="flex items-center my-4">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <Image
                      src={`https://image.tmdb.org/t/p/w154/${actor.profile_path}`}
                      width={40}
                      height={40}
                      alt={actor.name}
                      priority={true}
                    />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="font-bold">{actor.name}</p>
                  <p className="text-sm font-light italic">
                    as {actor.character}
                  </p>
                </div>
              </li>
            ))}
            <li>...</li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  console.log(context.query);
  const { movieId } = context.query;

  try {
    const [creditRes, movieDetailsRes] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.API_KEY}`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`
      ),
    ]);

    const creditData = await creditRes.json();
    const movieDetailsData = await movieDetailsRes.json();

    console.log({ creditData, movieDetailsData });

    return { props: { creditData, movieDetailsData } };
  } catch (error) {
    console.log("Error fetching movie data:", error);
    return {
      props: { creditData: null, movieDetailsData: null },
    };
  }
};
