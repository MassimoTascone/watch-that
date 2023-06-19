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
        <input placeholder="Search..." className="input input-bordered" />
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/movies"}>Movies</Link>
          </li>
          <li>
            <Link href={"/"}>Tv-Shows</Link>
          </li>
          <li>
            <Link href={"/"}>About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
