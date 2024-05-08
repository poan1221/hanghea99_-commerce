import { useUserStore } from "@/store/useUserStore";
import { useNavigate } from "../hook/useNavigate";
import { Navigation } from "../router/Navigation";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import shopLogo from "../assets/logo.svg";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/common/IconButton";

export const Header = () => {
  const { moveHome, moveCart, moveWish, moveLogin, moveSignup, moveMyList } =
    useNavigate();
  const user = useUserStore((state) => state.user);
  // console.log(user);

  const handleLogout = async () => {
    await signOut(auth);
    moveHome();
  };

  return (
    <header className="border-b border-slate-200">
      <div className="container max-w-1200 nav flex justify-between">
        <div className="text-left pt-6">
          <h1
            className="nav-title hover mb-6 cursor-pointer"
            onClick={() => moveHome()}
          >
            <img src={shopLogo} alt="logo" />
          </h1>
          <Navigation />
          {/* 모바일 버전 넣어야 함 */}
        </div>
        <div className="flex flex-col items-end py-4">
          {user ? (
            <div className="flex items-center text-sm">
              <Button variant="link" size="sm">
                내 정보
              </Button>
              |
              <Button variant="link" size="sm" onClick={handleLogout}>
                로그아웃
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center text-sm">
                <Button variant="link" size="sm" onClick={() => moveSignup()}>
                  회원가입
                </Button>
                |
                <Button variant="link" size="sm" onClick={() => moveLogin()}>
                  로그인
                </Button>
              </div>
            </>
          )}
          {user?.userType === "seller" ? (
            <div className="pt-2">
              <button className="nav-button hover" onClick={() => moveMyList()}>
                내 상품 조회
              </button>
            </div>
          ) : (
            <div className="flex gap-15">
              <IconButton
                iconType="heart"
                isTransperent
                onClick={() => moveWish()}
              />
              <IconButton
                iconType="cart"
                isTransperent
                onClick={() => moveCart()}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
