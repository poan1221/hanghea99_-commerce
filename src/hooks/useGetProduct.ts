import { getProducts, getUserWishes } from "@/hooks/useProductServies";
import { useUserStore } from "@/store/useUserStore";
import { Category, ProductsResponse, Series } from "@/types/product";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { getUserCartProduct } from "./useOrderServies";

// 전체 상품 목록 불러오기
export const useGetAllProducts = () => {
  return useInfiniteQuery<ProductsResponse>({
    queryKey: ["products"],
    queryFn: ({ pageParam }) => {
      const castedPageParam =
        pageParam as QueryDocumentSnapshot<DocumentData> | null;
      return getProducts(castedPageParam);
    },
    getNextPageParam: (lastPage) =>
      lastPage.nextPage ? lastPage.nextPage : undefined,
    refetchOnWindowFocus: false,
    initialPageParam: null, // 초기 페이지 파라미터 설정, 필요에 따라 조정 가능
  });
};

// 카테고리, 시리즈 상품 불러오기
export const useGetSelectedProducts = (selectedType: Series | Category) => {
  return useInfiniteQuery<ProductsResponse>({
    queryKey: ["products", selectedType],
    queryFn: ({ pageParam }) => {
      const castedPageParam =
        pageParam as QueryDocumentSnapshot<DocumentData> | null;
      return getProducts(castedPageParam, selectedType);
    },
    getNextPageParam: (lastPage) =>
      lastPage.nextPage ? lastPage.nextPage : undefined,
    refetchOnWindowFocus: false,
    initialPageParam: null, // 초기 페이지 파라미터 설정, 필요에 따라 조정 가능
  });
};

// 좋아요 상품 불러오기
export const useGetWishedProducts = (userId: string) => {
  return useInfiniteQuery<ProductsResponse>({
    queryKey: ["userWishesList", userId],
    queryFn: ({ pageParam }) => {
      const castedPageParam =
        pageParam as QueryDocumentSnapshot<DocumentData> | null;
      return getUserWishes(castedPageParam, userId);
    },
    getNextPageParam: (lastPage) =>
      lastPage.nextPage ? lastPage.nextPage : undefined,
    refetchOnWindowFocus: false,
    initialPageParam: null, // 초기 페이지 파라미터 설정, 필요에 따라 조정 가능
  });
};

// 카드 상품 불러오기
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
