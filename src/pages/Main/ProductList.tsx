import { useGetAllProducts } from "@/api/productQueries";
import { ProductCard } from "@/components/Product/card/ProductCard";
import { ProductCardSkelton } from "@/components/Product/card/ProductCardSkelecton";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const ProductList = () => {
  const { ref, inView } = useInView();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetAllProducts();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isLoading) {
    return <ProductCardSkelton productsPerRow={4} />;
  }

  const products = data?.pages.flatMap((page) => page.products) || [];

  if (products.length === 0) {
    return <div className="text-center">추가된 상품이 존재하지 않습니다.</div>;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard data={product} key={product.name} />
        ))}
      </div>
      <div ref={hasNextPage ? ref : undefined} />
      {isFetchingNextPage && <p>Loading more...</p>}
    </>
  );
};
