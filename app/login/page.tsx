"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import SocialLogin from "@/components/social-login";
import { login } from "./actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { useActionState } from "react";

const Login = () => {
  const [state, action] = useActionState(login, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">이메일과 비밀번호로 로그인해주세요.</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <Input type="email" placeholder="이메일" required name="email" errors={state?.fieldErrors.email} />
        <Input
          type="password"
          placeholder="비밀번호"
          required
          name="password"
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.password}
        />
        <Button text="로그인" />
      </form>
      <SocialLogin />
    </div>
  );
};

export default Login;
