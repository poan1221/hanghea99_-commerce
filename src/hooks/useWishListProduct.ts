import { IProductInfo } from "@/types/product";
import { useUserStore } from "@/store/useUserStore";
import { useDeleteSelectProduct } from "./useDeleteSelectProduct";
import { toggleWishProduct } from "./useProductServies";
import { useEffect, useState } from "react";

type CheckedProducts = Record<string, boolean>;
export const useWishListProduct = (products: IProductInfo[]) => {
  const user = useUserStore((state) => state.user);
  const [checkedProducts, setCheckedProducts] = useState<CheckedProducts>({});
  const [headChecked, setHeadChecked] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
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

  const deleteWishListMutation = useDeleteSelectProduct({
    mutationFn: (productUid: string) =>
      toggleWishProduct(user!.uid as string, productUid),
    queryKey: ["userWishesList", user!.uid],
  });

  const handleCheckDelete = async () => {
    const checkedProductIds = Object.entries(checkedProducts)
      .filter(([, value]) => value)
      .map(([key]) => key);
    if (window.confirm("선택한 상품을 리스트에서 삭제 하시겠습니까?")) {
      checkedProductIds.forEach((productUid) => {
        deleteWishListMutation.mutate(productUid);
      });
    }
  };

  return {
    checkedProducts,
    handleCheckDelete,
    handleAllClick,
    handleCheckbox,
  };
};
