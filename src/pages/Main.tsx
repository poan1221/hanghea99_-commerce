import { useGetAllProducts } from "@/hooks/useGetProduct";
import ErrorBox from "@/components/common/ErrorBox";
import { PromotionBanner } from "../components/pages/main/PromotionBanner";
import { PageTitle } from "@/components/common/PageTItle";
import { ProductList } from "../components/pages/main/ProductList";

export const Main = () => {
  const { isError } = useGetAllProducts();

  if (isError) {
    return <ErrorBox />;
  }

  return (
    <main>
      <PromotionBanner />
      <section className="container productsWrap max-w-6xl mt-11 mx-auto">
        <PageTitle title="New Arrival" />
        <ProductList />
      </section>
    </main>
  );
};
