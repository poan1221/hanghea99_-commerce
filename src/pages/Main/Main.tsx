import { useGetAllProducts } from "@/api/productQueries";
import ErrorBox from "@/components/common/ErrorBox";
import { PromotionBanner } from "./PromotionBanner";
import { PageTitle } from "@/components/common/PageTItle";
import { ProductList } from "./ProductList";

export const Main = () => {
  const { isError } = useGetAllProducts();

  if (isError) {
    return <ErrorBox />;
  }

  return (
    <main>
      <PromotionBanner />
      <section className="container productsWrap max-w-4xl mt-11 mx-auto">
        <PageTitle title="New Arrival" />
        <ProductList />
      </section>
    </main>
  );
};
