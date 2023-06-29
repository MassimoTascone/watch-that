import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { movieDataType } from "@/types/movieData.type";
import { ShowMediaInfos } from "./ShowMediaInfos";
import { allTvShowsType } from "@/types/allTvShows.type";

interface MediaListDisplayProps {
  mediaData: movieDataType[] | allTvShowsType[];
  mediaType: string;
}
interface MediaType {
  id: number;
  poster_path: string;
  title: string;
  name: string;
}

export function MediaListDisplay({
  mediaData,
  mediaType,
}: MediaListDisplayProps) {
  const [hoveredMovieId, setHoveredMovieId] = useState(null);

  const handleMouseOver = (movieId: any) => {
    setHoveredMovieId(movieId);
  };
  const handleMouseOut = () => {
    setHoveredMovieId(null);
  };
  console.log(mediaData);
  return (
    <div className="flex flex-wrap  gap-1 lg:gap-5 justify-center my-10">
      {mediaData?.map((media: MediaType) => (
        <Link href={`${mediaType}/${media.id}`} key={media.id}>
          <div
            onMouseOver={() => handleMouseOver(media.id)}
            onMouseOut={handleMouseOut}
            className="relative cursor-pointer"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
              alt={media.title || media.name}
              width={200}
              height={200}
              className="hover:brightness-50 rounded-lg drop-shadow-lg"
              unoptimized
              priority={true}
            />
            <ShowMediaInfos
              mediaData={media}
              movieId={media.id}
              hoveredMovieId={hoveredMovieId}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
