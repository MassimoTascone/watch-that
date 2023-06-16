import Link from "next/link";

export function NavBar() {
  return (
    <nav className="navbar text-white">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost normal-case text-xl"></Link>
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
            <details>
              <summary>
                <Link href={"/movies"}>Movies</Link>
              </summary>
              <ul className="p-2 bg-base-100">
                <li>
                  <a>Email</a>
                </li>
                <li>
                  <a>Other</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Tv Shows</summary>
              <ul className="p-2">
                <li>
                  <a>Popular Shows</a>
                </li>
                <li>
                  <a>Upcoming Shows</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link href={"/"}>About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
