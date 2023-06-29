import { useState } from "react";
import { fetchSearchResults } from "@/utils/searchResultsHelper";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/utils/formattingHelpers";
import { SearchResult } from "@/types/searchResults.type";

export function ModalSearch(searchResultsData: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([searchResultsData]);

  console.log({ searchResultsData });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      fetchSearchResults(event.target.value, setSearchResults);
    }
  };
  console.log(searchResults);
  return (
    <>
      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box p-1">
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search a movie or tv-show"
              className="input input-bordered  w-11/12 my-3 mx-3"
              value={searchTerm}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          {searchResults?.length > 1 && (
            <div>
              <h4 className="font-bold text-white uppercase ml-3 mb-2 ">
                Search Results
              </h4>
              <div>
                <ul>
                  <ul>
                    {searchResults
                      ?.filter(
                        (each) =>
                          each.media_type === "tv" ||
                          each.media_type === "movie"
                      )
                      .map((result) => (
                        <li key={result.id}>
                          <Link
                            href={
                              result.media_type === "movie"
                                ? `/movies/${result.id}`
                                : `/tvshows/${result.id}`
                            }
                            replace
                          >
                            <div className="hover:bg-slate-700 p-1 w-full flex items-center justify-between">
                              {result.poster_path ? (
                                <Image
                                  src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                                  alt={result.name || result.title}
                                  width={60}
                                  height={40}
                                  className="mr-5 p-1"
                                  priority={true}
                                />
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="50px"
                                  width="50px"
                                  version="1.1"
                                  viewBox="-300 -300 600 600"
                                  font-family="Bitstream Vera Sans,Liberation Sans, Arial, sans-serif"
                                  font-size="72"
                                  text-anchor="middle"
                                  className="mr-5 my-4"
                                >
                                  <circle
                                    stroke="#AAA"
                                    strokeWidth="10"
                                    r="280"
                                    fill="#FFF"
                                  />
                                  <switch>
                                    <text id="trsvg3-en" systemLanguage="en">
                                      <tspan x="0" y="-8" id="trsvg1-en">
                                        NO IMAGE
                                      </tspan>
                                      <tspan x="0" y="80" id="trsvg2-en">
                                        AVAILABLE
                                      </tspan>
                                    </text>
                                  </switch>
                                </svg>
                              )}

                              <p className="font-sans">
                                {result.title || result.name}{" "}
                                <span className="font-extralight">
                                  (
                                  {formatDate(
                                    result.release_date || result.first_air_date
                                  )}
                                  )
                                </span>
                              </p>
                              <p className="flex justify-center items-center">
                                {Math.round(result.vote_average * 10) / 10}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-6 h-6 ml-2"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </ul>
              </div>
            </div>
          )}
        </form>
        <form method="dialog" className="modal-backdrop bg-[#1D232Acc]">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
