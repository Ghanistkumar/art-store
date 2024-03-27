import React from "react";
import Image from "next/image";
import { Typography } from "@mui/material";
import {
  GlobeEuropeAfricaIcon,
  MicrophoneIcon,
  PuzzlePieceIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import CategoryCard from "@/components/category-card";

const CATEGORIES = [
  {
    img: "/image/blogs/blog-3.png",
    icon: HeartIcon,
    title: "Art 1",
    desc: "Art 1 Description",
  },
  {
    img: "/image/blogs/blog-12.jpeg",
    icon: PuzzlePieceIcon,
    title: "Art 2",
    desc: "Art 2 Description",
  },
  {
    img: "/image/blogs/blog-10.jpeg",
    icon: GlobeEuropeAfricaIcon,
    title: "Art 3",
    desc: "Art 3 Description",
  },
  {
    img: "/image/blogs/blog-13.png",
    icon: MicrophoneIcon,
    title: "Art 4",
    desc: "Art 4 Description",
  },
];

function StoreCategories() {
  return (
    <section className="flex flex-col items-center justify-center mx-auto px-4 py-20 sm:px-6 lg:px-8 min-h-screen container mt-64">
      <div className="mb-12 text-center">
        <Typography variant="h2" color="CaptionText" className="my-3">
          What we Create
        </Typography>
        <Typography
          variant="body1"
          color="GrayText"
          className="mx-auto"
        >
         Each piece in our collection tells a story, capturing moments of beauty, emotion, and imagination. Let our art transform your space into a gallery of dreams and discoveries.
        </Typography>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="grid grid-rows-1">
        <div className="overflow-hidden rounded-3xl">
          <Image
            src="/image/blogs/blog-13.png"
            alt="b"
            width={768}
            height={411}
            className="h-full w-full object-cover"
          />
        </div>
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          {CATEGORIES.slice(0, 2).map((props, key) => (
            <CategoryCard key={key} {...props} />
          ))}
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          {CATEGORIES.slice(2, 4).map((props, key) => (
            <CategoryCard key={key} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StoreCategories;
