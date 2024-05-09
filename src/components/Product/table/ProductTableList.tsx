import { userActionProduct } from "@/types/product";
import { ProductTableRow } from "@/components/Product/table/ProductTableRow";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface ProductListProps {
  products: userActionProduct[];
  isCart?: boolean;
}

export const ProductTableList = ({
  products: data,
  isCart = false,
}: ProductListProps) => {
  const [products, setproducts] = useState(data);
  const [headChecked, setHeadChecked] = useState(false);

  useEffect(() => {
    setproducts(data);
  }, [data]);

  const handleAllClick = () => {
    setproducts(
      products?.map((x) => {
        return {
          ...x,
          isChecked: !headChecked,
        };
      })
    );
    setHeadChecked(!headChecked);
  };

  const handleCheckbox = (uid: string) => {
    const idx = products.findIndex((x) => x.uid == uid);
    products[idx].isChecked = !products[idx].isChecked;
    setproducts([...products]);
  };

  return (
    <>
      {products.length === 0 ? (
        <div className="text-center">추가된 상품이 존재하지 않습니다.</div>
      ) : (
        <div className="productTableWrap text-left">
          <div className="py-1">
            <Button onClick={handleAllClick} variant="outline" size="sm">
              전체 선택
            </Button>
          </div>
          <div className="border-t-2 border-slate-900">
            {products.map((product) => (
              <ProductTableRow
                isCartItem={isCart}
                data={product}
                key={product.name}
                handleCheckbox={handleCheckbox}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
