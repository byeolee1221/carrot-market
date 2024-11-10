"use server";

import { z } from "zod";

const passwordRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/);

const checkUsername = (username: string) => {
  return !username.includes("potato");
};

const checkPasswords = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string!",
        required_error: "Username is required!",
      })
      .min(3, "Way too short")
      .max(10, "That's too long")
      .toLowerCase()
      .trim()
      .transform((username) => `🍕 ${username} 🍕`)
      .refine(checkUsername, "No potatoes allowed"),
    email: z.string().email().toLowerCase(),
    password: z.string().min(10).regex(passwordRegex, "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"),
    confirmPassword: z.string().min(10),
  })
  .refine(checkPasswords, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const createAccount = async (prevState: any, formData: FormData) => {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
};
