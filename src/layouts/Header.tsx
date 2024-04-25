import { useUserStore } from "@/store/useUserStore";
import { useNavigate } from "../hook/useNavigate";
import { Navigation } from "../router/Navigation";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export const Header = () => {
  const { moveHome, moveCart, moveLogin, moveSignup, moveMyList } =
    useNavigate();
  const user = useUserStore((state) => state.user);

  const handleLogout = async () => {
    await signOut(auth);
    moveHome();
  };

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
          {user ? (
            <div className="flex gap-15">
              <button className="nav-button hover" onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          ) : (
            <>
              <div className="flex gap-15">
                <button
                  className="nav-button hover"
                  onClick={() => moveSignup()}
                >
                  회원가입
                </button>
                <button
                  className="nav-button hover"
                  onClick={() => moveLogin()}
                >
                  로그인
                </button>
              </div>
            </>
          )}
          {user?.userType === "seller" ? (
            <div className="flex gap-15">
              <button className="nav-button hover" onClick={() => moveMyList()}>
                내 상품 조회
              </button>
            </div>
          ) : (
              <div className="flex gap-15">
                <button className="nav-button hover">위시리스트</button>
                <button className="nav-button hover" onClick={() => moveCart()}>
                  장바구니
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
