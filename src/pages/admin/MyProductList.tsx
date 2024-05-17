import { PageTitle } from "@/components/common/PageTItle";
import { useGetAllProducts } from "@/hooks/useGetProduct";
import ErrorBox from "@/components/common/ErrorBox";
import { AddProductButton } from "@/components/pages/admin/AddProductButton";
import { ProductAdminList } from "@/components/pages/admin/ProductAdminList";

export const MyProductList = () => {
  const { isError } = useGetAllProducts();

  if (isError) {
    return <ErrorBox />;
  }

  return (
    <section className="container max-w-6xl mt-11 mb-11 mx-auto">
      <PageTitle title="My Products List" alignLeft />
      <AddProductButton />
      <ProductAdminList />
    </section>
  );
};
