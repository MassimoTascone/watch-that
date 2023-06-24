import { movieDataType } from "@/types/movieData.type";
interface ShowMediaInfosProps {
  mediaData: movieDataType;
  movieId: number;
  hoveredMovieId: number | null;
}

export function ShowMediaInfos({
  mediaData,
  movieId,
  hoveredMovieId,
}: ShowMediaInfosProps) {
  if (hoveredMovieId !== movieId) return;

  return (
    <>
      <div className="absolute bottom-1 left-2  text-white bg-pink">
        <div className="font-sans font-bold">
          {mediaData.title || mediaData.name}
        </div>
      </div>

      <div className="badge badge-accent absolute top-2 right-1 font-bold">
        {mediaData.vote_average}
      </div>
    </>
  );
}
