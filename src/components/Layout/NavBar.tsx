import Image from "next/image";
import Link from "next/link";

export function NavBar() {
  return (
    <nav className="navbar text-white">
      <div className="flex-1">
        <Link
          href={"/"}
          className="btn btn-ghost normal-case text-xl hover:bg-transparent pl-[16px]"
        >
          <Image
            src="/watchthat-logo.svg"
            width={220}
            height={220}
            alt="watchthat logo svg"
          />
        </Link>
      </div>
      <div>
        <button
          type="button"
          className="sm:flex items-center w-72 text-left space-x-3 px-4 h-10  ring-slate-900/10  focus:outline-none focus:ring-2 shadow-sm rounded-lg bg-base-200 ring-0 text-slate-300 highlight-white/5 hover:bg-slate-700"
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
          <span className="flex-auto">Quick search...</span>
          <kbd className="font-sans font-semibold text-slate-500">
            <abbr title="Command" className="no-underline text-slate-500">
              ⌘
            </abbr>{" "}
            K
          </kbd>
        </button>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/movies"}>Movies</Link>
          </li>
          <li>
            <Link href={"/tvshows"}>Tv-Shows</Link>
          </li>
          <li>
            <Link href={"/"}>About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
