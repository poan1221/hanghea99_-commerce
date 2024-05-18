import Spinner from "@/components/common/Spinner";
import { useDeleteSelectProduct } from "@/hooks/useDeleteSelectProduct";
import { useGetAllProducts } from "@/hooks/useGetProduct";
import { useNavigate } from "@/hooks/useNavigate";
import { deleteProduct } from "@/hooks/useProductServies";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ProductListItem } from "./ProductListItem";

export const ProductAdminList = () => {
  const { moveEditProduct } = useNavigate();
  const { ref, inView } = useInView();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetAllProducts();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  const products = data?.pages.flatMap((page) => page.products) || [];

  const deleteProductMutation = useDeleteSelectProduct({
    mutationFn: (productUid: string) => deleteProduct(productUid),
    queryKey: ["products"],
  });

  const handleDeleteClick = async (productUid: string) => {
    if (window.confirm("이 상품을 삭제하시겠습니까?")) {
      deleteProductMutation.mutate(productUid);
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

  return (
    <div className="productsWrap max-w-6xl mt-11 mx-auto">
      {products.map((product) => (
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
      ))}
      <div ref={hasNextPage ? ref : undefined} />
      {isFetchingNextPage && <p>Loading more...</p>}
    </div>
  );
};
