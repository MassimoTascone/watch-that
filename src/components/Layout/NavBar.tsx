import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { ModalSearch } from "@/components/ModalSearch";

declare global {
  interface Window {
    my_modal_2: any;
  }
}

const handleKeyDown = (e: any) => {
  if (e.keyCode === 75 && e.metaKey) {
    window.my_modal_2.showModal();
  }
};

export function NavBar() {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <nav className="navbar text-white bg-transparent xl:px-24 lg:px-15">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href={"/movies"}>Movies</Link>
              </li>
              <li>
                <Link href={"/tvshows"}>Tv Shows</Link>
              </li>
            </ul>
          </div>
          <Link
            href={"/"}
            className="btn btn-ghost normal-case hover:bg-transparent pl-[16px] hidden lg:block"
          >
            <Image
              src="/watchthat-logo.svg"
              width={220}
              height={220}
              alt="watchthat logo svg"
            />
          </Link>
        </div>
        <div className="navbar-center  lg:flex">
          <Link
            href={"/"}
            className="btn btn-ghost normal-case hover:bg-transparent pl-[16px] lg:hidden"
          >
            <Image
              src="/watchthat-logo.svg"
              width={180}
              height={240}
              alt="watchthat logo svg"
            />
          </Link>
        </div>
        <div className="navbar-end">
          <div>
            <button
              type="button"
              className="flex items-center   w-22 lg:w-72 text-left space-x-3 px-4 h-10  ring-slate-900/10  focus:outline-none focus:ring-2 shadow-sm rounded-lg bg-base-200 ring-0 text-slate-300 highlight-white/5 hover:bg-slate-700"
              onClick={() => window.my_modal_2.showModal()}
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-none text-slate-400"
                aria-hidden="true"
              >
                <path d="m19 19-3.5-3.5"></path>
                <circle cx="11" cy="11" r="6"></circle>
              </svg>
              <span className="flex-auto hidden lg:flex">Quick search...</span>
              <kbd className="font-sans font-semibold text-slate-500">
                <abbr title="Command" className="no-underline text-slate-500">
                  ⌘
                </abbr>
                K
              </kbd>
            </button>
          </div>
          <ul className="menu menu-horizontal px-1 hidden lg:flex">
            <li>
              <Link href={"/movies"}>Movies</Link>
            </li>
            <li>
              <Link href={"/tvshows"}>Tv Shows</Link>
            </li>
          </ul>
        </div>
      </nav>
      <ModalSearch />
    </>
  );
}
