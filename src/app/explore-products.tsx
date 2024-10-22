import { Typography } from "@mui/material"
import ProductCard from "@/components/product-card"
import { Key } from "react";
import { fetchProducts, fetchProductsFromMongo } from "./lib/data";
import { QueryResultRow } from "@vercel/postgres";

// const {PRODUCTS} = require("../app/lib/placeholder-data.js")

export async function ExploreProducts() {


  // const PRODUCTS: QueryResultRow[] | any = await fetchProducts()
  const PRODUCTS: QueryResultRow[] | any = await fetchProductsFromMongo()
  return (
    <section className="px-8 py-8 bg-teal-50">
      <div className="container mx-auto mb-24 text-center">
        <Typography variant="h2" color="blue-gray">
          Explore Products
        </Typography>
        <Typography
          className="mt-2 mx-auto w-full px-4 !text-gray-500 lg:px-8"
        >
          Browse through 1,000+ web development courses and find the one that
          fits your needs.
        </Typography>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-24 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-14">
        {PRODUCTS != null && PRODUCTS.map((product: any, idx: Key | null | undefined) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ExploreProducts;
