import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function DisplayMovies(moviesData) {
  console.log(moviesData);
  const [hoveredMovieId, setHoveredMovieId] = useState(null);

  const handleMouseOver = (movieId) => {
    setHoveredMovieId(movieId);
  };

  const handleMouseOut = () => {
    setHoveredMovieId(null);
  };

  const movies = moviesData.moviesData.results;
  const imgUrl = "https://image.tmdb.org/t/p/w500/";

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-sans ont-bold text-white mb-4">
        {moviesData.title}
      </h2>
      <section>
        <div>
          <div className="carousel rounded-box gap-3">
            {movies?.map((movie, key) => (
              <div className="carousel-item" key={movie.id}>
                <Link href={`movies/${movie.id}`}>
                  <div
                    className="relative cursor-pointer"
                    onMouseOver={() => handleMouseOver(movie.id)}
                    onMouseOut={handleMouseOut}
                  >
                    <Image
                      src={imgUrl + movie.poster_path}
                      alt={movie.title}
                      width={200}
                      height={200}
                      className="hover:brightness-50"
                    />
                    {hoveredMovieId === movie.id && (
                      <>
                        <div className="absolute bottom-1 left-2  text-white bg-pink">
                          <div className="font-sans font-bold">
                            {movie.title}
                          </div>
                        </div>

                        <div className="badge badge-accent absolute top-2 right-1 font-bold">
                          {movie.vote_average}
                        </div>
                      </>
                    )}
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
