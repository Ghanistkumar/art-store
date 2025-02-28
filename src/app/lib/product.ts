import mongoose, { Schema, Document, models, model } from "mongoose";

// Define the Product interface that extends Document
interface Product extends Document {
  product_uuid: string;
  img: string;
  tag: string;
  product_name: string;
  price: number;
  description: string;
  stock_quantity: number;
  category_id: number;
  created_date: Date;
  modified_date: Date;
}

// Define the schema for the Product
const productSchema = new Schema<Product>({
  product_uuid: { type: String, required: true }, // Retaining product_uuid as a string
  img: { type: String, required: true },
  tag: { type: String, required: true },
  product_name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  stock_quantity: { type: Number, required: true, default: 0 },
  category_id: { type: Number, required: true },
  created_date: { type: Date, required: true, default: Date.now },
  modified_date: { type: Date, required: true, default: Date.now },
});
// Create the Product model using the schema
export const ProductModel =
  mongoose.models.Products || mongoose.model("Products", productSchema);
