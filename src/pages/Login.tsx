import { useNavigate } from "../hook/useNavigate";
import { LoginForm } from "../components/ui/form/LoginForm";
import { useLogin } from "../hook/useUserServices";

export const Login = () => {
  const { moveSignup } = useNavigate();
  const submitLogin = useLogin();

  return (
    <section className="max-w-lg section-py mx-auto">
      <h2 className="text-slate-900 font-bold text-[40px] pb-10">LOGIN</h2>
      <LoginForm login={submitLogin} />
      <div className="text-right cursor-pointer" onClick={() => moveSignup()}>
        아직 회원이 아니신가요?
      </div>
    </section>
  );
};
