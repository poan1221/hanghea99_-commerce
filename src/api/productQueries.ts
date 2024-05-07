import { getProducts } from "@/hook/useProductServies";
import { Category, ProductsResponse, Series } from "@/types/product";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

// 첫 홈 화면의 useQuery
export const useQueryInitialProducts = (series: Series) => {
  return useQuery<ProductsResponse>({
    queryKey: ["initial-products", series],
    queryFn: () => getProducts(null, undefined, series, 4),
    refetchOnWindowFocus: false,
  });
};

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
