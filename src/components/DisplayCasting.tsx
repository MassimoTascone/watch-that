import Image from "next/image";
import { useState } from "react";

interface castingListProps {
  castingList: {
    adult: boolean;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string;
    popularity: number;
    profile_path: string | null;
  }[];
}

export function DisplayCasting({ castingList }: castingListProps) {
  const [castNbrDisplayed, setCastNbrDisplayed] = useState(5);
  const [viewMoreClicked, setViewMoreClicked] = useState(false);

  const loadMoreCast = () => {
    setCastNbrDisplayed(castingList.length);
    setViewMoreClicked(true);
  };

  const showLessCast = () => {
    setCastNbrDisplayed(5);
    setViewMoreClicked(false);
  };

  return (
    <div className="p-3 ml-10 mt-10">
      <h2 className="font-bold text-2xl">Cast</h2>
      <ul className="overflow-auto max-h-[450px]">
        {castingList?.slice(0, castNbrDisplayed).map((actor) => (
          <li key={actor.id} className="flex items-center my-4">
            <div className="avatar">
              <div className="w-12 rounded-full">
                {actor.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w154/${actor.profile_path}`}
                    width={40}
                    height={40}
                    alt={actor.name}
                    priority={true}
                    unoptimized
                  />
                ) : (
                  <svg
                    className="absolute w-auto h-auto text-gray-400 -bottom-1 bg-slate-600 rounded-full"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </div>
            </div>
            <div className="ml-3">
              <p className="font-bold">{actor.name}</p>
              <p className="text-sm font-light italic">as {actor.character}</p>
            </div>
          </li>
        ))}
        <div className="flex justify-center">
          <button
            className="btn btn-xs btn-outline btn-accent"
            onClick={viewMoreClicked ? showLessCast : loadMoreCast}
          >
            {viewMoreClicked ? "Show Less" : "View More"}
          </button>
        </div>
      </ul>
    </div>
  );
}
