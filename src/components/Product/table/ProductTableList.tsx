import { userActionProduct } from "@/types/product";
import { ProductTableRow } from "@/components/Product/table/ProductTableRow";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface ProductListProps {
  products: userActionProduct[];
}

export const ProductTableList = ({ products: data }: ProductListProps) => {
  const [products, setproducts] = useState(data);
  const [headChecked, setHeadChecked] = useState(false);

  console.log(products);

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

  const handleDelete = async (uid: string) => {
    // 위시리스트에서 삭제
  };
  const handleCheckbox = (uid: string) => {
    console.log("눌럿어요", uid);
    const idx = products.findIndex((x) => x.uid == uid);
    products[idx].isChecked = !products[idx].isChecked;
    setproducts([...products]);
  };

  return (
    <>
      {products.length === 0 ? (
        <div className="text-center">추가된 상품이 존재하지 않습니다.</div>
      ) : (
        <div className="productTableWrap">
          <Checkbox
            className="mr-5"
            onClick={handleAllClick}
            checked={headChecked}
          />
          <div className="border-t">
            {data.map((product) => (
              <ProductTableRow
                data={product}
                key={product.name}
                handleDelete={handleDelete}
                handleCheckbox={handleCheckbox}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
