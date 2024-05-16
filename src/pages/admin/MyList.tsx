import { PageTitle } from "@/components/common/PageTItle";
import Spinner from "@/components/common/Spinner";
import { Button } from "@/components/ui/button";
import { ProductListItem } from "@/components/Product/admin/ProductListItem";

import { useNavigate } from "@/hooks/useNavigate";
import { deleteProduct } from "@/hooks/useProductServies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useGetAllProducts } from "@/hooks/useGetProduct";

export const MyList = () => {
  const { moveAddProduct, moveEditProduct } = useNavigate();
  const queryClient = useQueryClient();
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

  const deleteProductMutation = useMutation({
    mutationFn: (deletdataId: string) => deleteProduct(deletdataId),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
      }
    },
    onError: (error) => {
      console.error("오류가 발생하였습니다.:", error);
    },
  });

  const handleDeleteClick = async (data: string) => {
    if (window.confirm("이 상품을 삭제하시겠습니까?")) {
      deleteProductMutation.mutate(data);
    }
  };

  if (isLoading) {
    return (
      <div
        role="status"
        className="flex min-h-[calc(100dvh-64px)] w-full items-center justify-center"
      >
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div
        role="status"
        className="flex min-h-[calc(100dvh-64px)] w-full items-center justify-center"
      >
        에러가 발생했습니다.
      </div>
    );
  }

  return (
    <section className="container max-w-6xl pt-8 mx-auto">
      <PageTitle title="My Products List" alignLeft />
      <div className="mb-4 flex justify-end">
        <Button
          className="bg-slate-700 hover:bg-slate-900"
          onClick={() => moveAddProduct()}
        >
          상품 등록 +
        </Button>
      </div>
      <div className="productsWrap max-w-4xl mt-11 mx-auto">
        {data?.pages &&
          data?.pages.flatMap((page) =>
            page.products.map((product) => (
              <ProductListItem
                key={product.uid}
                data={product}
                onEdit={() =>
                  moveEditProduct(product.uid, {
                    state: {
                      product,
                    },
                  })
                }
                onDelete={() => handleDeleteClick(product.uid)}
              />
            ))
          )}
        <div ref={hasNextPage ? ref : undefined} />
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </section>
  );
};
