"use server";

import { PASSWORD_ERROR_MESSAGE, PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { PASSWORD_REGEX } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkExistEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email
    },
    select: {
      id: true
    }
  });

  return Boolean(user);
}

const formSchema = z.object({
  email: z.string({ required_error: "이메일을 입력해주세요." }).email().toLowerCase().refine(checkExistEmail, "가입되지 않은 이메일입니다."),
  password: z.string({ required_error: "비밀번호를 입력해주세요." }).min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE)
})

export const login = async (prevState: unknown, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password")
  }

  const result = await formSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email
      },
      select: {
        id: true,
        password: true
      }
    });

    const ok = await bcrypt.compare(result.data.password, user!.password ?? "");

    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["잘못된 비밀번호입니다."],
          email: []
        }
      }
    }
  }
}