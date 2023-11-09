import { MutableRefObject } from "react";

interface CarouselActionButtonsType {
  carouselRef: MutableRefObject<HTMLDivElement | null>;
}

export function CarouselActionButtons({
  carouselRef,
}: CarouselActionButtonsType) {
  const handleCarouselScroll = (direction: "forward" | "backward") => {
    if (carouselRef.current) {
      const itemWidth = 300; // Assuming each item has a fixed width of 300px
      const itemsToScroll = 2; // Scroll two items at a time

      // Calculate the scroll distance based on the width of two items
      const scrollDistance = itemWidth * itemsToScroll;

      // Determine the scroll direction and calculate the target scroll position
      const currentScroll = carouselRef.current.scrollLeft;
      const targetScroll =
        direction === "forward"
          ? currentScroll + scrollDistance
          : currentScroll - scrollDistance;

      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="justify-between items-center w-full py-2 gap-2 hidden md:flex absolute bottom-2 ">
      <button
        className="btn btn-md"
        onClick={() => handleCarouselScroll("backward")}
      >
        ❮
      </button>
      <button
        className="btn btn-md"
        onClick={() => handleCarouselScroll("forward")}
      >
        ❯
      </button>
    </div>
  );
}
