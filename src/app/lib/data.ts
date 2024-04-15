import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

const { db } = require("@vercel/postgres");
interface Product {
  product_id: number;
  img: string;
  tag: string;
  product_name: string;
  price: number;
  description: string;
}
export async function fetchProducts() {
  noStore();
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    const productData = await sql<Product>`SELECT * FROM products`;

    return productData.rows;
  } catch (error) {
    // console.error("Database Error:", error);
    // throw new Error("Failed to fetch product data.");
  }
}

export async function fetchProductsById(id: number) {
  noStore();
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
//   await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const singleProductData =
      await sql<Product>`SELECT * FROM products WHERE product_id = ${id}`;
    return singleProductData.rows[0];
  } catch (error) {
    // console.error("Database Error:", error);
  }
}

// async function main() {
//   const client = await db.connect();
// }

// main().catch((err) => {
//   console.error(
//     "An error occurred while attempting to seed the database:",
//     err
//   );
// });
