import { useGetSelectedProducts } from "@/hooks/useGetProduct";
import ErrorBox from "@/components/common/ErrorBox";
import {
  ProductCardSkelton,
  ProductList,
} from "@/components/pages/product/card";
import { PageTitle } from "@/components/common/PageTItle";
import { addSpaceSeriesTitle } from "@/utils/addSpaceSeriesTitle";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";

export const ProductSelectedList = () => {
  const selectedType = useParams().id;
  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetSelectedProducts(selectedType as string);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isError) {
    return <ErrorBox />;
  }

  const products = data?.pages.flatMap((page) => page.products) || [];

  return (
    <section className="container productsWrap max-w-6xl section-md-py mx-auto">
      <PageTitle
        title={addSpaceSeriesTitle(selectedType as string)}
        alignLeft
      />
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
  );
};
