import Image from "next/image";
import { Layout } from "@/components/Layout/Layout";
import { DisplayCasting } from "@/components/DisplayCasting";
import {
  formatDate,
  formatDuration,
  formatPrice,
} from "@/utils/formattingHelpers";
import Head from "next/head";
import {
  movieDetailsDataType,
  creditDataType,
  imagesDataType,
} from "@/types/movieDetails.type";

interface MovieDetailsProps {
  movieDetailsData: movieDetailsDataType;
  creditData: creditDataType;
  imagesData: imagesDataType;
}

export default function MovieDetails({
  movieDetailsData,
  creditData,
  imagesData,
}: MovieDetailsProps) {
  const englishOnlyImages = imagesData?.backdrops?.filter(
    (image) => image.iso_639_1 === "en" || image.iso_639_1 === null
  );

  return (
    <Layout>
      <Head>
        <title>
          {movieDetailsData?.title} {formatDate(movieDetailsData?.release_date)}{" "}
          | Movie | Watch That
        </title>
      </Head>
      <section>
        {movieDetailsData.backdrop_path && (
          <Image
            id="heroImg"
            src={`https://image.tmdb.org/t/p/w780/${movieDetailsData?.backdrop_path}`}
            alt="bg-img"
            fill
            className="absolute top-0 left-0 -z-10 w-screen h-auto brightness-50"
            priority={true}
            unoptimized
          />
        )}
      </section>

      <section className="min-h-screen text-white grid lg:grid-cols-[1fr,2fr,1fr] grid-row-1 justify-center mx-5 lg:mx-12  mt-10 lg:mt-40">
        <div className="flex flex-col items-center justify-center lg:justify-normal">
          <div className="mb-5 flex flex-col items-center lg:hidden">
            <h2 className="text-3xl font-sans font-extrabold ">
              {movieDetailsData?.title}
              <span className="ml-2 font-extralight">
                ({formatDate(movieDetailsData?.release_date)})
              </span>
            </h2>
            <p className="font-sm italic font-extralight">
              Original title: {movieDetailsData?.original_title}
            </p>
          </div>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movieDetailsData?.poster_path}`}
            width={300}
            height={300}
            alt={movieDetailsData?.title}
            priority={true}
            className="rounded-lg drop-shadow-lg mb-5 lg:mb-0"
            unoptimized
          />
          <div className="flex items-center w-full  justify-center lg:justify-normal">
            <div className="text-white m-2">
              {Math.round(movieDetailsData?.vote_average * 10) / 10}
            </div>
            <div className="ml-5">
              <p>
                {movieDetailsData?.vote_average}{" "}
                <span className="font-extralight">ratings</span>
              </p>
              <p>
                {movieDetailsData?.vote_count}{" "}
                <span className="font-extralight">reviews</span>
              </p>
            </div>
          </div>
        </div>

        <div className="p-1 lg:p-3 lg:mt-10 ml-10">
          <div>
            <h2 className="text-3xl font-sans font-extrabold hidden lg:block ">
              {movieDetailsData?.title}
              <span className="ml-2 font-extralight">
                ({formatDate(movieDetailsData?.release_date)})
              </span>
            </h2>
            <p className="font-sm italic font-extralight hidden lg:block">
              Original title: {movieDetailsData?.original_title}
            </p>
            <div className="flex items-center gap-3 mt-10">
              <p>Movie&nbsp; &#x2022; </p>
              <p>{formatDuration(movieDetailsData?.runtime)}</p>
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
                {movieDetailsData?.genres?.map((genre) => (
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
                  {movieDetailsData?.budget === 0
                    ? "Unknown"
                    : formatPrice(movieDetailsData?.budget)}
                </p>
              </div>

              <div className="grid-span-1 p-2">
                <h4>Revenue</h4>
              </div>
              <div className="col-span-2 p-2">
                <p className="font-extralight">
                  {movieDetailsData?.revenue === 0
                    ? "Unknown"
                    : formatPrice(movieDetailsData?.revenue)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <DisplayCasting castingList={creditData.cast} />
      </section>

      <section className="mx-12 mb-20">
        <h3 className="font-bold text-2xl mb-4 text-white">Photos</h3>
        <div className="flex w-full justify-center">
          <div className="carousel carousel-center max-w-[90rem] space-x-4 rounded-box">
            {englishOnlyImages?.map((image, index) => (
              <div key={index} className="carousel-item h-[270px]">
                <a
                  href={`https://image.tmdb.org/t/p/w780/${image.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    alt="img"
                    src={`https://image.tmdb.org/t/p/w780/${image.file_path}`}
                    width={500}
                    height={300}
                    priority={true}
                    unoptimized
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps = async (context: any) => {
  const { movieId } = context.query;

  try {
    const [creditRes, movieDetailsRes, imagesRes] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.API_KEY}`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${process.env.API_KEY}`
      ),
    ]);

    const creditData = await creditRes.json();
    const movieDetailsData = await movieDetailsRes.json();
    const imagesData = await imagesRes.json();

    console.log({ creditData, movieDetailsData, imagesData });

    return {
      props: { creditData, movieDetailsData, imagesData },
    };
  } catch (error) {
    console.log("Error fetching movie data:", error);
    return {
      props: { creditData: null, movieDetailsData: null, imagesData: null },
    };
  }
};
