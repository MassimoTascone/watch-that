import Link from "next/link";
export function NavBar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">WatchThat</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/movies"}>Movies</Link>
          </li>
          <li>
            <a>Tv Shows</a>
          </li>
          <li>
            <a>Actors</a>
          </li>
          <li>
            <details>
              <summary>Contact</summary>
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
        </ul>
      </div>
    </div>
  );
}
