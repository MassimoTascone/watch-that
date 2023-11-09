import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { ShowMediaInfos } from "./ShowMediaInfos";
import { MovieDataResponse } from "@/types/movieData.type";
import { CarouselActionButtons } from "@/components/CarouselActionButtons";

interface DisplayMoviesProps {
  moviesData: MovieDataResponse;
  title: string;
}

export default function DisplayMovies({
  moviesData,
  title,
}: DisplayMoviesProps) {
  const [hoveredMovieId, setHoveredMovieId] = useState<number | null>(null);
  const [movies, setmovies] = useState(moviesData.results);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleMouseOver = (movieId: number) => {
    setHoveredMovieId(movieId);
  };

  const handleMouseOut = () => {
    setHoveredMovieId(null);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-sans font-bold text-white mb-4">{title}</h2>
      <section>
        <div className="relative">
          <div className="carousel rounded-box gap-3" ref={carouselRef}>
            {movies?.map((movie) => (
              <div className="carousel-item" key={movie.id}>
                <Link href={`movies/${movie.id}`}>
                  <div
                    className="relative cursor-pointer"
                    onMouseOver={() => handleMouseOver(movie.id)}
                    onMouseOut={handleMouseOut}
                  >
                    <Image
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                      width={200}
                      height={200}
                      className="hover:brightness-50"
                      unoptimized
                    />
                    <ShowMediaInfos
                      mediaData={movie}
                      movieId={movie.id}
                      hoveredMovieId={hoveredMovieId}
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {movies && <CarouselActionButtons carouselRef={carouselRef} />}
        </div>
      </section>
    </div>
  );
}
