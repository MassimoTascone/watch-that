import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShowMediaInfos } from "./ShowMediaInfos";

export default function DisplayMovies(moviesData) {
  const [hoveredMovieId, setHoveredMovieId] = useState(null);
  const [movies, setmovies] = useState(moviesData.moviesData.results);

  const handleMouseOver = (movieId) => {
    setHoveredMovieId(movieId);
  };

  const handleMouseOut = () => {
    setHoveredMovieId(null);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-sans font-bold text-white mb-4">
        {moviesData?.title}
      </h2>
      <section>
        <div>
          <div className="carousel rounded-box gap-3">
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
        </div>
      </section>
    </div>
  );
}
