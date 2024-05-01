import { getProducts } from "@/hook/useProductServies";
import { ProductsResponse } from "@/types/product";
import { useInfiniteQuery } from "@tanstack/react-query";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

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
