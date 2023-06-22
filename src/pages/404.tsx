import { Layout } from "@/components/Layout/Layout";
import Image from "next/image";
import Link from "next/link";

function Custom404() {
  return (
    <Layout>
      <section className="min-h-screen flex justify-center">
        <h1 className="text-white font-bold text-[500px] absolute select-none -z-10 top-2 font-sans">
          404
        </h1>
        <div className="grid">
          <Image
            src={
              "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjliOXdxbG52NzJ0djUzNzliMzJxc3ZwMTFzbDcyNjFhMTJ5Y3RzcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Yf7kN6Xdle87K/giphy.gif"
            }
            width={550}
            height={350}
            alt="Confused Travolta Meme"
            className="select-none"
            priority={true}
          />
          <div>
            <div className="mb-10">
              <p className="text-white font-bold text-3xl select-none text-center font-sans">
                Uh Oh ! It looks like you&apos;re lost...
              </p>
            </div>
            <div className="flex justify-center">
              <Link className="btn btn-accent" href={"/"}>
                Bring me back
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Custom404;
