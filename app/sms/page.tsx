import Button from "@/components/Button";
import Input from "@/components/Input";

const Sms = () => {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form className="flex flex-col gap-3">
        <Input type="tel" placeholder="Phone number" required errors={[]} name="phoneNumber" />
        <Input
          type="number"
          placeholder="Verification code"
          required
          errors={[]}
          name="verificationCode"
        />
        <Button text="Verify" />
      </form>
    </div>
  );
};

export default Sms;
