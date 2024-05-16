import { useNavigate } from "@/hooks/useNavigate";
import { IUserInfo } from "@/types/user";

interface CheckProps {
  user: IUserInfo | null;
  productQuantity: number;
}

export const useCheckCanOrder = ({ user, productQuantity }: CheckProps) => {
  const { moveLogin } = useNavigate();

  const canOrder = () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      moveLogin();
      return false;
    } else if (user && user?.userType === "seller") {
      alert("판매자는 상품을 구매할 수 없습니다.");
      return false;
    }

    if (productQuantity === 0) {
      alert("상품 수량을 1개 이상 담아주세요.");
      return false;
    }

    return true;
  };

  return canOrder;
};
