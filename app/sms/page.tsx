"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useActionState } from "react";
import { smsLogin } from "./actions";

const initialState = {
  token: false,
  error: undefined,
};

const Sms = () => {
  const [state, action] = useActionState(smsLogin, initialState);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS 로그인</h1>
        <h2 className="text-xl">휴대폰 번호를 인증해주세요.</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        {state?.token ? (
          <Input
            type="number"
            placeholder="인증코드"
            required
            name="token"
            min={100000}
            max={999999}
            errors={state.error?.formErrors}
          />
        ) : (
          <Input
            type="text"
            placeholder="휴대폰 번호"
            required
            name="phone"
            errors={state.error?.formErrors}
          />
        )}
        <Button text={state.token ? "토큰 인증하기" : "인증 문자 보내기"} />
      </form>
    </div>
  );
};

export default Sms;
