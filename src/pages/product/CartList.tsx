import { useGetCartProducts } from "@/api/productQueries";
import ErrorBox from "@/components/common/ErrorBox";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useUserStore } from "@/store/useUserStore";
import { PageTitle } from "@/components/common/PageTItle";
import {
  ProductTableList,
  ProductTableSkelton,
} from "@/components/Product/table";

export const CartList = () => {
  const user = useUserStore((state) => state.user);
  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCartProducts(user?.uid as string);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isError) return <ErrorBox />;

  const products = data?.pages.flatMap((page) => page.products) || [];

  return (
    <section className="container productsWrap max-w-4xl mt-11 mx-auto">
      <PageTitle title="My Cart List" alignLeft />
      {isLoading ? (
        <ProductTableSkelton productsPerRow={4} />
      ) : (
        <>
          <ProductTableList products={products} isCart />
          <div ref={hasNextPage ? ref : undefined} />
          {isFetchingNextPage && <p>Loading more...</p>}
        </>
      )}
    </section>
  );
};
