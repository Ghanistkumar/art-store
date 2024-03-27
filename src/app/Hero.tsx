"use client";

import Image from "next/image";
import { Typography, Card } from "@mui/material";

function Hero() {
  return (
    <div className="!flex h-[55vh] w-full items-center justify-between px-10">
      <Image
        width={920}
        height={720}
        src="/image/image8.svg"
        alt="bg-img"
        className="absolute inset-0 ml-auto w-[920px] h-[780px] rounded-bl-[100px] object-cover object-center"
      />
      <div className="container mx-auto mt-32">
        <div className="grid grid-cols-12 text-center lg:text-left">
          <Card className="col-span-full rounded-xl border border-white bg-white/90 py-10 p-8 shadow-lg shadow-black/10 backdrop-blur-sm backdrop-saturate-200 xl:col-span-7">
          <Typography
              variant="h3"
              color="blue-gray"
              className="lg:text-xl !leading-snug text-xl lg:max-w-lg"
            >
              Discover the Extraordinary: Elevate Your Space with Unique Art Finds!!!
            </Typography>
            <Typography className="mb-10 mt-6 !text-gray-900">
            Unleash your inner artist 🎨✨. Dive into a world where creativity knows no bounds. Explore our unique collection and find your next masterpiece today. #ArtIsLife
            </Typography>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default Hero;
