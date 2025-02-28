import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { Category } from "../../../type";
import { connectToMongoDB } from "./mongo";
import { ProductModel } from "./product";
import mongoose from 'mongoose';
interface Product {
  product_id: number;
  img: string;
  tag: string;
  product_name: string;
  price: number;
  description: string;
}

export async function fetchProductsFromMongo() {
  noStore(); // Ensure response caching is disabled
  
  // Establish the MongoDB connection if it's not already connected
  const dbConnection = await connectToMongoDB();

  try {
    // Query the "products" collection using the Product model
    const products = await ProductModel.findOne({});
    console.log(products)
    let p = []
    p.push(products)
    return p; // Return the list of products
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
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
    console.log('data', categoriesData)
    return categoriesData.rows;
  } catch (error) {
    // console.error("Database Error:", error);
    // throw new Error("Failed to fetch product data.");
  }
}
