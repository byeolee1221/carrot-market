"use server";

import { PASSWORD_ERROR_MESSAGE, PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { PASSWORD_REGEX } from "@/lib/constants";
import { z } from "zod";

const formSchema = z.object({
  email: z.string({ required_error: "이메일을 입력해주세요." }).email().toLowerCase(),
  password: z.string({ required_error: "비밀번호를 입력해주세요." }).min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE)
})

export const login = async (prevState: unknown, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password")
  }

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}