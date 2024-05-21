"use server";
import { sql } from "@vercel/postgres";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ShippingDetails } from "../../../type";
const bcrypt = require("bcrypt");

export type State = {
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export type UserState = {

  errors?: {
    email?: string[];
    password?: string[];
  };
};

const SignUpFormSchema = z.object({
  username: z.string().min(1, "User Name is required"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters"),
});

export async function createUser(prevState: State, formData: FormData) {
  const validatedFields = SignUpFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "",
    };
  }
  const { username, email, password } = validatedFields.data;

  const checkEmail = await sql`SELECT email from users WHERE email=${email}`;
  if (checkEmail.rowCount > 0) {
    console.log("Email exists");
    return {
      errors: {
        username: [],
        email: [],
        password: [],
      },
      message: "Email already exists",
    };
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    await sql`INSERT INTO users (username,password_hash,email,created_date,modified_date) VALUES (${username}, ${hashedPassword}, ${email}, NOW(), NOW())`;
  } catch (error) {
    console.error("add User Error:", error);
  }

  revalidatePath("/");
  redirect("/");
}

async function getUser(email: string){
  try {
    const user = await sql`SELECT user_id, email, username, password_hash FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }
}

export async function signIn(prevState: UserState, formData: FormData) {
  const parsedCredentials = z
    .object({ email: z.string().email("Invalid email format"), password: z.string() })
    .safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
  
  if(!parsedCredentials.success){
    return {
      errors: parsedCredentials.error.flatten().fieldErrors,
      message: "",
    };
  }

  if (parsedCredentials.success) {
    const { email, password } = parsedCredentials.data;
    const user = await getUser(email);
    console.log(user)
    if (!user){
      return {
        errors: [],
        message: "Invalid Username / Password",
      }
    }
    const passwordsMatch = await bcrypt.compare(password, user.password_hash);
    if (passwordsMatch){
      return user;
    } else {
      return {
        errors: [],
        message: "Invalid Username / Password",
      }
    }
  }

  return null;
}

export async function placeOrder(
  shippingAddress: string,
  user_id: string,
  totalAmount: number
) {
  try {
    const order_id =
      await sql`INSERT INTO orders (user_id, order_date, shipping_address, total_amount)
    VALUES (${user_id}, NOW(), ${shippingAddress}, ${totalAmount}) RETURNING order_id`;
    return order_id.rows[0];
  } catch (error) {
    console.error("Failed to add Order:", error);
  }
}

export async function sendOrderDetails(
  orderId: string,
  product_id: string,
  quantity: number,
  price: number,
  paymentId: string
) {
  try {
    await sql`INSERT INTO order_details (order_id, product_id, quantity, price_at_purchase, payment_id)
    VALUES (${orderId}, ${product_id}, ${quantity}, ${price}, ${paymentId});`;
  } catch (err) {
    console.error("Failed to add Order details:", err);
  }
}