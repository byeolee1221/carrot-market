"use client";

import FormBtn from "@/components/Button";
import Input from "@/components/Input";
import SocialLogin from "@/components/social-login";
import { createAccount } from "./actions";
import { useFormState } from "react-dom";

const CreateAccount = () => {
  const [state, action] = useFormState(createAccount, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <Input
          type="text"
          placeholder="Username"
          required
          name="username"
          errors={state?.fieldErrors?.username}
          minLength={3}
          maxLength={10}
        />
        <Input
          type="email"
          placeholder="Email"
          required
          name="email"
          errors={state?.fieldErrors.email}
        />
        <Input
          type="password"
          placeholder="Password"
          required
          name="password"
          errors={state?.fieldErrors.password}
          minLength={4}
        />
        <Input
          type="password"
          placeholder="Confirm password"
          required
          name="confirmPassword"
          errors={state?.fieldErrors.confirmPassword}
          minLength={4}
        />
        <FormBtn text="Create account" />
      </form>
      <SocialLogin />
    </div>
  );
};

export default CreateAccount;
