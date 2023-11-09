import Image from "next/image";
import { useRef } from "react";
import { ImagesDataType } from "@/types/imagesData.type";
import { CarouselActionButtons } from "@/components/CarouselActionButtons";

interface DisplayMediaImagesProps {
  imagesData: ImagesDataType;
}

export function DisplayMediaImages({ imagesData }: DisplayMediaImagesProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const englishOnlyImages = imagesData?.backdrops?.filter(
    (image) => image.iso_639_1 === "en" || image.iso_639_1 === null
  );

  return (
    <section className="mx-12 mb-20 mt-4">
      <h3 className="font-bold text-2xl mb-4 text-white">Photos</h3>
      <div className="flex w-full justify-center relative">
        <div
          className="carousel carousel-center max-w-[90rem] space-x-4 rounded-box"
          ref={carouselRef}
        >
          {englishOnlyImages?.map((image, index) => (
            <div key={index} className="carousel-item h-[270px]">
              <a
                href={`https://image.tmdb.org/t/p/w780/${image.file_path}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  alt="img"
                  src={`https://image.tmdb.org/t/p/w780/${image.file_path}`}
                  width={500}
                  height={300}
                  priority={true}
                  unoptimized
                />
              </a>
            </div>
          ))}
        </div>
        {englishOnlyImages && (
          <CarouselActionButtons carouselRef={carouselRef} />
        )}
      </div>
    </section>
  );
}
