import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useGetAllProducts } from "@/api/productQueries";
import ErrorBox from "@/components/common/ErrorBox";
import { PageTitle } from "@/components/common/PageTItle";
import { ProductCardSkelton, ProductList } from "@/components/Product/card";

export const Main = () => {
  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllProducts();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isError) {
    return <ErrorBox />;
  }

  const products = data?.pages.flatMap((page) => page.products) || [];

  // console.log(products);

  return (
    <>
      {/* 홍보용 배너 */}
      <section className="promotion">
        <div className="promotionBanner">
          <img
            className="object-fill w-full max-h-[416px] h-full"
            src="https://firebasestorage.googleapis.com/v0/b/hanghea99-commerce.appspot.com/o/images%2FBanner.png?alt=media&token=f598b90a-98ee-4f49-af33-50a80ddca2c5"
            alt="promotionBanner"
          />
        </div>
      </section>
      {/* 시리즈별  _ 4개씩*/}
      <section className="container productsWrap max-w-4xl mt-11 mx-auto">
        <PageTitle title="New Arrival" />
        {isLoading ? (
          <ProductCardSkelton productsPerRow={4} />
        ) : (
          <>
            <ProductList products={products} />
            <div ref={hasNextPage ? ref : undefined} />
            {isFetchingNextPage && <p>Loading more...</p>}
          </>
        )}
      </section>
    </>
  );
};
