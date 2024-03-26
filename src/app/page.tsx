import Image from "next/image";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">

    //   </div>
    // </main>
    <>
      <Navbar />
      <Image
        src="https://demos.creative-tim.com/nextjs-tailwind-course-landing-page/image/image8.svg"
        width={920}
        height={720}
        alt="Picture of the author"
        className="ml-auto absolute inset-0"
      />
    </>
  );
}
