import { useGetWishedProducts } from "@/hooks/useGetProduct";
import ErrorBox from "@/components/common/ErrorBox";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useUserStore } from "@/store/useUserStore";
import { PageTitle } from "@/components/common/PageTItle";
import { ProductTableSkelton } from "@/components/pages/product/table";
import { ProductWishList } from "@/components/pages/wish/ProductWishList";

export const WishList = () => {
  const user = useUserStore((state) => state.user);
  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetWishedProducts(user?.uid as string);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  const products = data?.pages.flatMap((page) => page.products) || [];

  if (isError) return <ErrorBox />;

  return (
    <section className="container productsWrap max-w-6xl mt-11 mx-auto">
      <PageTitle title="My Wish List" alignLeft />
      {isLoading ? (
        <ProductTableSkelton productsPerRow={4} />
      ) : (
        <>
          <ProductWishList products={products} />
          <div ref={hasNextPage ? ref : undefined} />
          {isFetchingNextPage && <p>Loading more...</p>}
        </>
      )}
    </section>
  );
};
