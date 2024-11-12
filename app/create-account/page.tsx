"use client";

import FormBtn from "@/components/Button";
import Input from "@/components/Input";
import SocialLogin from "@/components/social-login";
import { createAccount } from "./actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { useActionState } from "react";

const CreateAccount = () => {
  const [state, action] = useActionState(createAccount, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">회원가입 양식을 작성해주세요.</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <Input
          type="text"
          placeholder="닉네임"
          required
          name="username"
          errors={state?.fieldErrors?.username}
          minLength={3}
          maxLength={10}
        />
        <Input
          type="email"
          placeholder="이메일"
          required
          name="email"
          errors={state?.fieldErrors.email}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          required
          name="password"
          errors={state?.fieldErrors.password}
          minLength={PASSWORD_MIN_LENGTH}
        />
        <Input
          type="password"
          placeholder="비밀번호 확인"
          required
          name="confirmPassword"
          errors={state?.fieldErrors.confirmPassword}
          minLength={PASSWORD_MIN_LENGTH}
        />
        <FormBtn text="회원가입" />
      </form>
      <SocialLogin />
    </div>
  );
};

export default CreateAccount;
