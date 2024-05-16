import { useNavigate } from "../hooks/useNavigate";
import { LoginForm } from "../components/form/LoginForm";
import { useLogin } from "../hooks/useUserServices";
import { PageTitle } from "@/components/common/PageTItle";

export const Login = () => {
  const { moveSignup } = useNavigate();
  const submitLogin = useLogin();

  return (
    <section className="max-w-lg section-py mx-auto">
      <PageTitle title="LOGIN" />
      <LoginForm login={submitLogin} />
      <div className="text-right cursor-pointer" onClick={() => moveSignup()}>
        아직 회원이 아니신가요?
      </div>
    </section>
  );
};
