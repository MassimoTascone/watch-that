import Image from "next/image";
import Link from "next/link";
import { movieDataType } from "@/types/movieData.type";

interface MediaListDisplayProps {
  mediaData: movieDataType;
  mediaType: string;
}

export function MediaListDisplay({
  mediaData,
  mediaType,
}: MediaListDisplayProps) {
  console.log(mediaData);
  return (
    <div className="flex flex-wrap gap-5 justify-center my-10">
      {mediaData?.map((media: any) => (
        <Link href={`${mediaType}/${media.id}`} key={media.id}>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
            alt={media.title}
            width={200}
            height={200}
            className="hover:brightness-50 rounded-lg drop-shadow-lg"
            priority={true}
          />
        </Link>
      ))}
    </div>
  );
}
