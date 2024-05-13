import { useUserStore } from "@/store/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { getUserCartProduct } from "./useOrderServies";

export const useUserCartProduct = () => {
  const user = useUserStore((state) => state.user);
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userCartList", user?.uid],
    queryFn: () => getUserCartProduct(user?.uid as string),
    enabled: !!user?.uid,
  });

  return { products, isLoading, isError };
};
