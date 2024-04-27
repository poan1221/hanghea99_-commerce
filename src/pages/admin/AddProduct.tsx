import { PageTitle } from "@/components/common/PageTItle";
import { ProductForm } from "@/components/form/ProductForm";
import { UseAddProduct } from "@/hook/useProductServies";

export function AddProduct() {
  const addProduct = UseAddProduct();
  return (
    <section className="container max-w-6xl section-py mx-auto ">
      <PageTitle title="상품 등록하기" alignLeft />
      <ProductForm addProduct={addProduct} />
    </section>
  );
}
