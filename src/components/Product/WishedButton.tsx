import { getIsWishes, toggleWishProduct } from "@/hook/useProductServies";
import { useUserStore } from "@/store/useUserStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IconButton } from "../common/IconButton";
import { useNavigate } from "@/hook/useNavigate";

interface WishButtonProps {
  productUID: string;
}

export const WishedButton = ({ productUID }: WishButtonProps) => {
  const user = useUserStore((state) => state.user);
  const { moveLogin } = useNavigate();
  const [isWished, setIsWished] = useState<boolean>(false);

  const { data: wishProducts, isSuccess } = useQuery({
    queryKey: ["userWishes", user?.uid],
    queryFn: () => getIsWishes(user?.uid as string),
    enabled: !!user?.uid,
  });

  useEffect(() => {
    if (isSuccess && wishProducts) {
      setIsWished(wishProducts.some((wish) => wish.productId === productUID));
    }
  }, [isSuccess, wishProducts, productUID]);

  const toggleWishMutation = useMutation({
    mutationFn: () => toggleWishProduct(user!.uid as string, productUID),
    onSuccess: () => {
      setIsWished((prev) => !prev);
    },
    onError: (error) => {
      console.error("오류가 발생하였습니다.:", error);
    },
  });

  const handleWish = (event: React.MouseEvent) => {
    const confirmText = isWished
      ? "이 상품을 위시리스트에서 삭제하시겠습니까?"
      : "이 상품을 위시리스트에 담으시겠습니까?";

    event.stopPropagation();
    if (!user) {
      alert("로그인이 필요합니다.");
      moveLogin();
      return;
    }
    if (window.confirm(confirmText)) {
      toggleWishMutation.mutate();
    }
  };

  return (
    <IconButton
      iconType={isWished ? "heartFill" : "heart"}
      onClick={handleWish}
      isTransperent
      className={isWished ? "text-red-600" : "text-gray-500 hover:text-red-600"}
    />
  );
};
