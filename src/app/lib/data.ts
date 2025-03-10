import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { Category } from "../../../type";
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
    const productData = await sql`SELECT * FROM products`;

    return productData.rows;
  } catch (error) {
    // console.error("Database Error:", error);
    // throw new Error("Failed to fetch product data.");
  }
}

export async function fetchProductsById(id: string) {
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

export async function fetchEmail(email: string) {
  noStore();
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  //   await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const emailId = await sql`Select email from users WHERE email=${email}`;
    return emailId.rowCount;
  } catch (error) {
    // console.error("Database Error:", error);
  }
}

export async function fetchCategories() {
  noStore();
  try {
    const categoriesData = await sql`SELECT * FROM categories`;
    return categoriesData.rows;
  } catch (error) {
    // console.error("Database Error:", error);
    // throw new Error("Failed to fetch product data.");
  }
}
