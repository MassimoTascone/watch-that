import { NavBar } from "./NavBar";
import FooterWithLogo from "./FooterWithLogo";

export function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <FooterWithLogo />
    </>
  );
}
