import { PageTitle } from "@/components/common/PageTItle";
import { ProductForm } from "@/components/form/ProductForm";
import { useNavigate } from "@/hooks/useNavigate";
import { UseEditProduct } from "@/hooks/useProductServies";
import { ProductInfo } from "@/types/product";

export function EditProduct() {
  const {
    locationState: { product },
  } = useNavigate();

  const initialData = product as ProductInfo;

  const editProduct = UseEditProduct();
  return (
    <section className="container max-w-6xl mt-11 mb-11 md:mt-20 mx-auto ">
      <PageTitle title="상품 수정하기" alignLeft />
      <ProductForm productFormHandle={editProduct} initialData={initialData} />
    </section>
  );
}
