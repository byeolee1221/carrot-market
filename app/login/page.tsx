import FormBtn from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { redirect } from "next/navigation";

const Login = () => {
  const handleForm = async (formData: FormData) => {
    "use server";
    await new Promise((resolve) => setTimeout(resolve, 5000));
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form action={handleForm} className="flex flex-col gap-3">
        <FormInput type="email" placeholder="Email" required errors={[]} name="email" />
        <FormInput type="password" placeholder="Password" required errors={[]} name="password" />
        <FormBtn text="Login" />
      </form>
      <SocialLogin />
    </div>
  );
};

export default Login;
