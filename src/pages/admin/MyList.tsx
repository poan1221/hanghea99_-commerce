import { PageTitle } from "@/components/common/PageTItle";
import Spinner from "@/components/common/Spinner";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@/hook/useNavigate";
import { deleteProduct, getMyProducts } from "@/hook/useProductServies";
import { useUserStore } from "@/store/useUserStore";
import { IProductInfo } from "@/types/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductListItem } from "@/components/Product/admin/ProductListItem";
import React from "react";

export const MyList = () => {
  const { moveAddProduct, moveEditProduct } = useNavigate();
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<IProductInfo[]>({
    queryKey: ["products", user?.uid],
    queryFn: async () => {
      if (!user?.uid) {
        return [];
      }
      const products = await getMyProducts(user.uid);
      return products as IProductInfo[];
    },
    enabled: !!user && !!user.uid,
    staleTime: 1000 * 60 * 30, // 30분
  });

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
    return <div>에러가 발생했습니다.</div>;
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
        {data?.map((product, index) => (
          <React.Fragment key={product.uid}>
            <ProductListItem
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
            {data.length > 1 && index < data.length - 1 ? (
              <hr className="my-4" />
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
