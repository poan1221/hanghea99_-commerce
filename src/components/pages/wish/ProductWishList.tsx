import { ProductTableRow } from "@/components/pages/product/table/ProductTableRow";
import { Button } from "@/components/ui/button";
import { ProductInfo } from "@/types/product";
import { useWishListProduct } from "@/hooks/useWishListProduct";

interface ProductWishListProps {
  products: ProductInfo[];
}
export const ProductWishList = ({ products }: ProductWishListProps) => {
  // const { checkedProducts, handleCheckbox, handleAllClick } =
  //   useHandleChecked(products);

  const { handleCheckDelete, checkedProducts, handleCheckbox, handleAllClick } =
    useWishListProduct(products);

  if (products.length === 0) {
    <div className="text-center">추가된 상품이 존재하지 않습니다.</div>;
  }

  return (
    <>
      <div className="productTableWrap text-left">
        <div className="py-1">
          <Button onClick={handleAllClick} variant="outline" size="sm">
            전체 선택
          </Button>
          <Button
            onClick={handleCheckDelete}
            variant="outline"
            size="sm"
            className="ml-2"
          >
            선택 삭제
          </Button>
        </div>
        <div className="border-t-2 border-slate-900">
          {products.map((product) => (
            <ProductTableRow
              data={product}
              key={product.name}
              isChecked={checkedProducts[product.uid]}
              handleCheckbox={handleCheckbox}
            />
          ))}
        </div>
      </div>
    </>
  );
};
