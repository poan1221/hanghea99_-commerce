import { PageTitle } from "@/components/common/PageTItle";
import { SignUpFormTypes } from "@/components/form/SignUpForm";
import { useSignUp } from "@/hooks/useUserServices";

export const SignUp = () => {
  const submitSignUp = useSignUp();

  return (
    <section className="max-w-lg section-py mx-auto">
      <PageTitle title="CREAT ACCOUNT" />
      <SignUpForm signUp={submitSignUp} />
    </section>
  );
};
