import ErrorBox from "@/components/common/ErrorBox";
import { PageTitle } from "@/components/common/PageTItle";
import { ProductTableSkelton } from "@/components/Product/table";
import { useUserCartProduct } from "@/hooks/useGetProduct";
import { ProductCartList } from "@/components/Product/cart/ProductCartList";

export const Cart = () => {
  const { products, isLoading, isError } = useUserCartProduct();

  if (isError) return <ErrorBox />;

  return (
    <section className="container productsWrap max-w-4xl mt-11 mx-auto">
      <PageTitle title="My Cart List" alignLeft />

      {isLoading ? (
        <ProductTableSkelton productsPerRow={4} />
      ) : (
        <>{products && <ProductCartList />}</>
      )}
    </section>
  );
};
