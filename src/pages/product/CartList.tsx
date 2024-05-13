import ErrorBox from "@/components/common/ErrorBox";
import { useUserStore } from "@/store/useUserStore";
import { PageTitle } from "@/components/common/PageTItle";
import {
  ProductTableList,
  ProductTableSkelton,
} from "@/components/Product/table";
import { useQuery } from "@tanstack/react-query";
import { getUserCartProduct } from "@/hook/useOrderServies";

export const CartList = () => {
  const user = useUserStore((state) => state.user);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userCartList", user?.uid],
    queryFn: () => getUserCartProduct(user?.uid as string),
    enabled: !!user?.uid,
  });

  if (isError) return <ErrorBox />;

  return (
    <section className="container productsWrap max-w-4xl mt-11 mx-auto">
      <PageTitle title="My Cart List" alignLeft />
      {isLoading ? (
        <ProductTableSkelton productsPerRow={4} />
      ) : (
        <>{products && <ProductTableList products={products} isCart />}</>
      )}
    </section>
  );
};
