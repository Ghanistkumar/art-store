import React from "react";
import Image from "next/image";
import { Typography } from "@mui/material";
import CategoryCard from "@/components/category-card";
// const  {CATEGORIES} = require("../app/lib/placeholder-data.js")
import { fetchCategories } from "./lib/data";
import { QueryResultRow } from "@vercel/postgres";
import { Category } from "../../type";

async function StoreCategories() {
  const CATEGORIES: QueryResultRow | any = await fetchCategories();
  return (
    <section className="flex flex-col items-center justify-center mx-auto px-4 py-20 sm:px-6 lg:px-8 min-h-screen container mt-64">
      <div className="mb-12 text-center">
        <Typography variant="h2" color="CaptionText" className="my-3">
          What we Create
        </Typography>
        <Typography variant="body1" color="GrayText" className="mx-auto">
          Each piece in our collection tells a story, capturing moments of
          beauty, emotion, and imagination. Let our art transform your space
          into a gallery of dreams and discoveries.
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
          {CATEGORIES?.slice(0, 2).map((category: Category, index: number) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          {CATEGORIES?.slice(2, 4).map((category: Category, index: number) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StoreCategories;
