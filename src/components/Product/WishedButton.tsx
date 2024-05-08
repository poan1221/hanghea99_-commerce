import { getUserWishes, toggleWishProduct } from "@/hook/useProductServies";
import { useUserStore } from "@/store/useUserStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IconButton } from "../common/IconButton";

interface WishButtonProps {
  productUID: string;
}

export const WishedButton = ({ productUID }: WishButtonProps) => {
  const user = useUserStore((state) => state.user);
  const [isWished, setIsWished] = useState<boolean>(false);

  const { data: wishProducts, isSuccess } = useQuery({
    queryKey: ["userWishes", user?.uid],
    queryFn: () => getUserWishes(user?.uid as string),
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
      alert("위시리스트에 추가되었습니다.");
      setIsWished((prev) => !prev);
    },
    onError: (error) => {
      console.error("오류가 발생하였습니다.:", error);
    },
  });

  const handleWish = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (window.confirm("이 상품을 위시리스트에 담으시겠습니까?")) {
      toggleWishMutation.mutate();
    }
  };

  return (
    <IconButton
      iconType={isWished ? "heartFill" : "heart"}
      onClick={handleWish}
      className={`bg-tansparent hover:bg-gray-400 hover:bg-opacity-10 ${
        isWished ? "text-red-600" : "text-gray-500 hover:text-red-600"
      }`}
    />
  );
};
