import { useState } from "react";
import { updateCartQuantity } from "./useOrderServies";
import { useMutation } from "@tanstack/react-query";

export const useQuantity = (initialQuantity: number) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      alert("최소 구매 수량은 1개입니다.");
    }
  };

  return { quantity, incrementQuantity, decrementQuantity };
};

export const useCartQuantity = (initialQuantity: number, ids: string[]) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const updateCartMutation = useMutation({
    mutationFn: (newQuantity: number) =>
      updateCartQuantity(ids[0], ids[1], newQuantity),
    onSuccess: (data) => {
      setQuantity(data);
    },
    onError: (error) => {
      console.error("오류가 발생하였습니다.:", error);
    },
  });

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    if (window.confirm("장바구니 수량을 변경하시겠니까?")) {
      updateCartMutation.mutate(newQuantity);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      if (window.confirm("장바구니 수량을 변경하시겠니까?")) {
        updateCartMutation.mutate(newQuantity);
      }
    } else {
      alert("최소 구매 수량은 1개입니다.");
    }
  };

  return { quantity, incrementQuantity, decrementQuantity };
};
