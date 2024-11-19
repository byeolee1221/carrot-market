"use server";

import { PASSWORD_ERROR_MESSAGE, PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { PASSWORD_REGEX } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(user);
};

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(user);
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "닉네임은 문자열이어야 합니다.",
        required_error: "닉네임을 입력해주세요.",
      })
      .toLowerCase()
      .trim()
      // .transform((username) => `🍕 ${username} 🍕`)
      .refine(checkUsername, "No potatoes allowed")
      .refine(checkUniqueUsername, "이미 존재하는 사용자입니다."),
    email: z.string().email().toLowerCase().refine(checkUniqueEmail, "이미 존재하는 이메일입니다."),
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

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword
      },
      select: {
        id: true
      }
    });

    const cookie = await getIronSession(await cookies(), {
      cookieName: "delicious-carrot",
      password: process.env.COOKIE_PASSWORD!
    });
    //@ts-ignore
    cookie.id = user.id;
    await cookie.save();

    redirect("/profile");
  }
};
