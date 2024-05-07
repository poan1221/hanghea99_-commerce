import { useGetSelectedProducts } from "@/api/productQueries";
import { ProductCard } from "@/components/Product/ProductCard";
import ProductCardSkelton from "@/components/Product/ProductCardSkelecton";
import { PageTitle } from "@/components/common/PageTItle";
import { addSpaceSeriesTitle } from "@/utils/addSpaceSeriesTitle";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";

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

  return (
    <section className="container productsWrap max-w-4xl mt-11 mx-auto">
      <PageTitle title={getTitle(selectedType as string)} alignLeft />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {isLoading && <ProductCardSkelton productsPerRow={4} />}
        {isError && <div>에러가 발생했습니다.</div>}
        {data?.pages && data.pages[0].products.length === 0 && (
          <div className="text-center col-span-full">
            추가된 상품이 존재하지 않습니다.
          </div>
        )}
        {data?.pages &&
          data?.pages.flatMap((page) =>
            page.products.map((product) => (
              <ProductCard data={product} key={product.name} />
            ))
          )}
        <div ref={hasNextPage ? ref : undefined} />
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </section>
  );
};
