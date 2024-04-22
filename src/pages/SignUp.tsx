import { SignUpForm } from "@/components/form/SignUpForm";
import { useSignUp } from "@/hook/useUserServices";

export const SignUp = () => {
  const submitSignUp = useSignUp();

  return (
    <section className="max-w-lg section-py mx-auto">
      <h2 className="text-slate-900 font-bold text-[40px] pb-10">
        CREAT ACCOUNT
      </h2>
      <SignUpForm signUp={submitSignUp} />
    </section>
  );
};
