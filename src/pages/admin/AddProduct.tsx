import { PageTitle } from "@/components/common/PageTItle";
import { ProductForm } from "@/components/form/ProductForm";
import { UseAddProduct } from "@/hook/useProductServies";

export function AddProduct() {
  const addProduct = UseAddProduct();
  return (
    <section className="max-w-6xl section-py mx-auto">
      <PageTitle title="ADD PRODUCT" alignLeft />
      <ProductForm addProduct={addProduct} />
    </section>
  );
}
