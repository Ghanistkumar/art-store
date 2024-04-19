"use server";
import { sql } from "@vercel/postgres";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { error } from "console";
const bcrypt = require("bcrypt");

export type State = {
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

const SignUpFormSchema = z.object({
  username: z.string().min(1, "User Name is required"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
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
    const hashedPassword = await bcrypt.hash(password, 10);
    await sql`INSERT INTO users (username,password_hash,email,created_date,modified_date) VALUES (${username}, ${hashedPassword}, ${email}, NOW(), NOW())`;
  } catch (error) {
    console.error("add User Error:", error);
  }

  revalidatePath("/");
  redirect("/");
}
