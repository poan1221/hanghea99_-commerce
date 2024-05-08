import { addCartProduct } from "@/hook/useOrderServies";
import { useUserStore } from "@/store/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useCheckCanOrder } from "@/hook/useCheckCanOrder";

interface CartButtonProps {
  productUID: string;
  productQuantity: number;
}

export const CartButton = ({
  productUID,
  productQuantity,
}: CartButtonProps) => {
  const user = useUserStore((state) => state.user);

  const addCartMutation = useMutation({
    mutationFn: () =>
      addCartProduct(user!.uid as string, productUID, productQuantity),
    onSuccess: () => {
      alert("장바구니에 추가되었습니다.");
    },
    onError: (error) => {
      console.error("오류가 발생하였습니다.:", error);
    },
  });

  const canOrder = useCheckCanOrder({ user, productQuantity });

  const handleGoCart = () => {
    if (canOrder() && window.confirm("이 상품을 장바구니에 담으시겠습니까?")) {
      addCartMutation.mutate();
    }
  };

  return (
    <Button className="w-1/2 text-lg rounded-none" onClick={handleGoCart}>
      장바구니
    </Button>
  );
};
