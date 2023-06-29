import Image from "next/image";
import { MovieDataResponse } from "@/types/movieData.type";

interface HeroBannerProps {
  moviesData: MovieDataResponse;
}

export function HeroBanner({ moviesData }: HeroBannerProps) {
  const bannerImg = `https://image.tmdb.org/t/p/original/${moviesData.results[4].backdrop_path}`;

  return (
    <section className="h-auto mb-60">
      <Image
        id="heroImg"
        className="absolute top-0 left-0 -z-10 w-screen brightness-40 h-[780px]"
        src={bannerImg}
        width={1080}
        height={920}
        alt={moviesData.results[0].title}
      />
    </section>
  );
}
