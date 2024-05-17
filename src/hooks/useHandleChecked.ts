import { ProductInfo, UserActionProduct } from "@/types/product";
import { useEffect, useState } from "react";

type CheckedProducts = Record<string, boolean>;

export const useHandleChecked = (
  products: UserActionProduct[] | ProductInfo[]
) => {
  const [checkedProducts, setCheckedProducts] = useState<CheckedProducts>({});
  const [headChecked, setHeadChecked] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      console.log("useEffect ");
      const newCheckedProducts = products.reduce((acc, product) => {
        acc[product.uid] = false;
        return acc;
      }, {} as CheckedProducts);
      setCheckedProducts(newCheckedProducts);
    }
  }, [products]);

  const handleAllClick = () => {
    const newCheckedProducts = products.reduce((acc, product) => {
      acc[product.uid] = !headChecked;
      return acc;
    }, {} as CheckedProducts);
    setCheckedProducts(newCheckedProducts);
    setHeadChecked(!headChecked);
  };

  const handleCheckbox = (uid: string) => {
    setCheckedProducts({
      ...checkedProducts,
      [uid]: !checkedProducts[uid],
    });
  };

  console.log("---", checkedProducts);
  return {
    checkedProducts,
    handleAllClick,
    handleCheckbox,
  };
};
