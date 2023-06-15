import Image from "next/image";
import { Inter } from "next/font/google";
import FooterWithLogo from "@/components/FooterWithLogo";
import { NavBar } from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <NavBar />
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <h1>Welcome to WatchThat</h1>
      </main>
      <FooterWithLogo />
    </>
  );
}
