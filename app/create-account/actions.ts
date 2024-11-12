"use server";

import { PASSWORD_ERROR_MESSAGE, PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { PASSWORD_REGEX } from "@/lib/constants";
import { z } from "zod";

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
        invalid_type_error: "닉네임은 문자열이어야 합니다.",
        required_error: "닉네임을 입력해주세요.",
      })
      .toLowerCase()
      .trim()
      .transform((username) => `🍕 ${username} 🍕`)
      .refine(checkUsername, "No potatoes allowed"),
    email: z.string().email().toLowerCase(),
    password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE),
    confirmPassword: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .refine(checkPasswords, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export const createAccount = async (prevState: unknown, formData: FormData) => {
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
