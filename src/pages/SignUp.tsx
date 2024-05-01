import { PageTitle } from "@/components/common/PageTItle";
import { SignUpForm } from "@/components/form/SignUpForm";
import { useSignUp } from "@/hook/useUserServices";

export const SignUp = () => {
  const submitSignUp = useSignUp();

  return (
    <section className="max-w-lg section-py mx-auto">
      <PageTitle title="CREAT ACCOUNT" />
      <SignUpForm signUp={submitSignUp} />
    </section>
  );
};
