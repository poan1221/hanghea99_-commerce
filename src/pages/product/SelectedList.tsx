import { useGetSelectedProducts } from "@/api/productQueries";
import ErrorBox from "@/components/common/ErrorBox";
import ProductCardSkelton from "@/components/Product/ProductCardSkelecton";
import { PageTitle } from "@/components/common/PageTItle";
import { addSpaceSeriesTitle } from "@/utils/addSpaceSeriesTitle";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import { ProductList } from ".";

export const ProductSelectedList = () => {
  const selectedType = useParams().id;
  const { ref, inView } = useInView();

  const getTitle = (selectedType: string) => {
    if (selectedType === "OfficeSupplies") {
      return "Office Items";
    } else {
      return addSpaceSeriesTitle(selectedType);
    }
  };

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
    <section className="container productsWrap max-w-4xl mt-11 mx-auto">
      <PageTitle title={getTitle(selectedType as string)} alignLeft />
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
