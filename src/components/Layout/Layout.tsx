import { NavBar } from "./NavBar";
import FooterWithLogo from "./FooterWithLogo";
import { ReactNode } from "react";
interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <FooterWithLogo />
    </>
  );
}
