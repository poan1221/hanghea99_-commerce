import { ProductTableRow } from "@/components/Product/table/ProductTableRow";
import { Button } from "@/components/ui/button";
import { useUserCartProduct } from "@/hook/useUserCartProduct";
import { TotalPrice } from "./TotalPrice";
import { useCartProduct } from "@/hook/useCartProduct";

export const ProductCartList = () => {
  const { products } = useUserCartProduct();

  if (products === undefined) {
    return <div>로딩중...</div>;
  }

  const {
    checkedProducts,
    checkedProductIds,
    handleAllClick,
    handleCheckbox,
    handleCheckDelete,
    totalAmount,
    delieveryFee,
  } = useCartProduct(products);

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
              isCartItem
              data={product}
              key={product.name}
              isChecked={checkedProducts[product.uid]}
              handleCheckbox={handleCheckbox}
            />
          ))}
        </div>
        <div>
          <TotalPrice totalAmount={totalAmount} delieveryFee={delieveryFee} />
          <div className="w-full text-center">
            <Button
              className="w-1/3"
              disabled={checkedProductIds.length < 1}
              onClick={() => alert("구매하기")}
            >
              선택 상품 구매하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
