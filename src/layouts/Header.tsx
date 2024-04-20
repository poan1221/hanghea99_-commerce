import { useNavigate } from "../hook/useNavigate";
import { Navigation } from "../router/Navigation";

export const Header = () => {
  const { moveHome, moveCart, moveLogin, moveSignup } = useNavigate();

  return (
    <header className="border-b border-slate-200">
      <div className="max-w-1200 nav flex justify-between">
        <div className="text-left">
          <h1 className="nav-title hover" onClick={() => moveHome()}>
            plaveshop
          </h1>
          <Navigation />
        </div>
        <div className="flex-center">
          <div className="flex gap-15">
            <button className="nav-button hover" onClick={() => moveSignup()}>
              회원가입
            </button>
            <button className="nav-button hover" onClick={() => moveLogin()}>
              로그인
            </button>
          </div>
          <div className="flex gap-15">
            <button className="nav-button hover">위시리스트</button>
            <button className="nav-button hover" onClick={() => moveCart()}>
              장바구니
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
