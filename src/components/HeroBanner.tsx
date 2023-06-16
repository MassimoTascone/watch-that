import Image from "next/image";
export function HeroBanner(moviesData) {
  const bannerImg = `https://image.tmdb.org/t/p/original/${moviesData.moviesData.results[3].backdrop_path}`;
  console.log(bannerImg);

  return (
    <section className="relative w-screen h-auto">
      <Image
        className="absolute top-0 left-0"
        src={bannerImg}
        width={1080}
        height={1}
        alt={moviesData.moviesData.results[0].title}
      />
    </section>
  );
}
