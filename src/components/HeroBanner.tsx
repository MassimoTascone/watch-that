import Image from "next/image";
export function HeroBanner(moviesData) {
  const bannerImg = `https://image.tmdb.org/t/p/original/${moviesData.moviesData.results[2].backdrop_path}`;
  console.log(bannerImg);

  return (
    <section className="h-auto mb-60">
      <Image
        id="heroImg"
        className="absolute top-0 left-0 -z-10 w-screen brightness-40 h-[780px]"
        src={bannerImg}
        width={1080}
        height={920}
        alt={moviesData.moviesData.results[0].title}
      />
    </section>
  );
}
