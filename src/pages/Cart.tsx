import ErrorBox from "@/components/common/ErrorBox";
import { PageTitle } from "@/components/common/PageTItle";
import { ProductTableSkelton } from "@/components/pages/product/table";
import { useUserCartProduct } from "@/hooks/useGetProduct";
import { ProductCartList } from "@/components/pages/cart/ProductCartList";

export const Cart = () => {
  const { products, isLoading, isError } = useUserCartProduct();

  if (isError) return <ErrorBox />;

  return (
    <section className="container productsWrap max-w-6xl section-md-py mx-auto">
      <PageTitle title="My Cart List" alignLeft />

      {isLoading ? (
        <ProductTableSkelton productsPerRow={4} />
      ) : (
        <>{products && <ProductCartList />}</>
      )}
    </section>
  );
};
