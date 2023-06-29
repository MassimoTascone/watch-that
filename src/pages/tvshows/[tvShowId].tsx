import { Layout } from "@/components/Layout/Layout";
import { useState } from "react";
import Image from "next/image";
import { formatDate } from "@/utils/formattingHelpers";
import { DisplayCasting } from "@/components/DisplayCasting";
import Head from "next/head";

export default function MovieDetails({
  tvCreditData,
  tvDetailsData,
  tvImagesData,
}) {
  console.log(tvCreditData?.cast);
  console.log(tvDetailsData);
  console.log(tvImagesData);

  const imageUrl = tvDetailsData?.poster_path;
  const bgImg = `https://image.tmdb.org/t/p/w780/${tvDetailsData?.backdrop_path}`;

  return (
    <Layout>
      <Head>
        <title>
          {tvDetailsData?.name} - {formatDate(tvDetailsData?.first_air_date)} |
          Tv Shows | Watch That
        </title>
      </Head>
      <section>
        {tvDetailsData.backdrop_path && (
          <Image
            id="heroImg"
            src={bgImg}
            alt="bg-img"
            fill
            className="absolute top-0 left-0 -z-10 w-full brightness-50"
            priority={true}
          />
        )}
      </section>

      <section className="min-h-screen text-white grid lg:grid-cols-[1fr,2fr,1fr] grid-row-1 justify-center mx-5 lg:mx-12  mt-10 lg:mt-40">
        <div className="flex flex-col items-center justify-center lg:justify-normal">
          <div className="mb-5 flex flex-col items-center lg:hidden">
            <h2 className="text-3xl font-sans font-extrabold ">
              {tvDetailsData.name}
              <span className="ml-2 font-extralight">
                ({formatDate(tvDetailsData?.first_air_date)})
              </span>
            </h2>
            <p className="font-sm italic font-extralight">
              Original title: {tvDetailsData?.original_name}
            </p>
          </div>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${imageUrl}`}
            width={300}
            height={300}
            alt={tvDetailsData?.name}
            priority={true}
            className="rounded-lg drop-shadow-lg"
          />
        </div>

        <div className="p-1 lg:p-3 lg:mt-10 ml-10">
          <div>
            <h2 className="text-3xl font-sans font-extrabold hidden lg:block">
              {tvDetailsData?.name}
              <span className="ml-2 font-extralight ">
                ({formatDate(tvDetailsData?.first_air_date)})
              </span>
            </h2>
            <p className="font-sm italic font-extralight hidden lg:block">
              Original title: {tvDetailsData?.original_name}
            </p>
            <div className="flex items-center gap-3 mt-10">
              <p>Tv Show&nbsp; &#x2022; </p>
              <p>
                {tvDetailsData?.number_of_seasons} season
                {tvDetailsData?.number_of_seasons > 0 ? "s" : ""}
                &nbsp; &#x2022;
              </p>
              <p>
                {tvDetailsData?.number_of_episodes} episode
                {tvDetailsData?.number_of_episodes > 0 ? "s" : ""}
              </p>
            </div>
            <p className="mt-10 text-base leading-loose	">
              {tvDetailsData?.overview}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-2xl mt-10 mb-5">Details</h3>
            <div className="grid grid-cols-3 grid-rows-3 divide-slate-700">
              <div className="grid-span-1 p-2 divie-y">
                <h4>Genres</h4>
              </div>
              <div className="flex gap-3 col-span-2 p-2">
                {tvDetailsData?.genres?.map((genre) => (
                  <div className="badge badge-neutral truncate" key={genre.id}>
                    {genre.name}
                  </div>
                ))}
              </div>

              <div className="grid-span-1 p-2">
                <h4>Created by</h4>
              </div>
              <div className=" gap-3 col-span-2 p-2">
                <p className="font-extralight">
                  {tvDetailsData?.created_by?.slice(0, 3).map((creator) => (
                    <span className="ml-3" key={creator.id}>
                      {creator.name}
                    </span>
                  ))}
                </p>
              </div>

              <div className="grid-span-1 p-2">
                <h4>Produced by</h4>
              </div>
              <div className="col-span-2 p-2">
                <p className="font-extralight">
                  {tvDetailsData?.production_companies
                    ?.slice(0, 2)
                    .map((producer) => (
                      <span className="ml-3" key={producer.id}>
                        {producer.name},
                      </span>
                    ))}
                  <span>...</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <DisplayCasting castingList={tvCreditData.cast} />
      </section>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  console.log(context.query);
  const { tvShowId } = context.query;

  try {
    const [tvCreditRes, tvDetailsRes, tvImagesRes] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/tv/${tvShowId}/credits?api_key=${process.env.API_KEY}`
      ),
      fetch(
        `https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${process.env.API_KEY}`
      ),
      fetch(
        `https://api.themoviedb.org/3/tv/${tvShowId}/images?api_key=${process.env.API_KEY}`
      ),
    ]);

    const tvCreditData = await tvCreditRes.json();
    const tvDetailsData = await tvDetailsRes.json();
    const tvImagesData = await tvImagesRes.json();

    console.log({ tvCreditData, tvDetailsData, tvImagesData });

    return {
      props: { tvCreditData, tvDetailsData, tvImagesData },
    };
  } catch (error) {
    console.log("Error fetching movie data:", error);
    return {
      props: { creditData: null, movieDetailsData: null, imagesData: null },
    };
  }
};
