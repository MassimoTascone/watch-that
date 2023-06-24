import { useState } from "react";
import { fetchSearchResults } from "@/utils/searchResultsHelper";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/utils/formattingHelpers";

export function ModalSearch(searchResultsData) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([searchResultsData]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    fetchSearchResults(searchTerm, setSearchResults);
  };

  console.log({ searchTerm });
  console.log({ searchResults });
  return (
    <>
      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box p-30">
          <input
            type="text"
            placeholder="Search a movie or tv-show"
            className="input input-bordered input-accent w-full mb-10"
            value={searchTerm}
            onChange={handleChange}
          />
          <div>
            <h4 className="font-bold text-white uppercase ">Search Results</h4>
            <div>
              <ul>
                <ul>
                  {searchResults
                    ?.filter(
                      (each) =>
                        each.media_type === "tv" || each.media_type === "movie"
                    )
                    .map((result) => (
                      <li key={result.id}>
                        <Link
                          href={
                            result.media_type === "movie"
                              ? `movies/${result.id}`
                              : `tvshows/${result.id}`
                          }
                        >
                          <div className="hover:bg-slate-700 p-5 w-full flex items-center">
                            <Image
                              src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                              alt={result.name || result.title}
                              width={30}
                              height={30}
                              className="mr-5"
                            />
                            <p>
                              {result.title || result.name} -
                              <span className="font-extralight">
                                (
                                {formatDate(
                                  result.release_date || result.first_air_date
                                )}
                                )
                              </span>
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                </ul>
              </ul>
            </div>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop bg-[#1D232Acc]">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
