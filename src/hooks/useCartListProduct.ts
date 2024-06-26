import { UserActionProduct } from "@/types/product";
import { deleteCartProduct } from "./useOrderServies";
import { useUserStore } from "@/store/useUserStore";
import { useDeleteSelectProduct } from "./useDeleteSelectProduct";
import { useEffect, useState } from "react";

type CheckedProducts = Record<string, boolean>;

export const useCartListProduct = (products: UserActionProduct[]) => {
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

  const checkedProductIds = Object.entries(checkedProducts)
    .filter(([, value]) => value)
    .map(([key]) => key);

  const deleteCartListMutation = useDeleteSelectProduct({
    mutationFn: (productUid: string) =>
      deleteCartProduct(user!.uid as string, productUid),
    queryKey: ["userCartList", user!.uid],
  });

  const handleCheckDelete = async () => {
    if (window.confirm("선택한 상품을 리스트에서 삭제 하시겠습니까?")) {
      checkedProductIds.forEach((productUid) => {
        deleteCartListMutation.mutate(productUid);
      });
    }
  };

  const totalAmount = products
    .filter(({ uid }) => checkedProducts[uid])
    .reduce((acc, cur) => acc + cur.price * cur.productQuantity!, 0);
  const delieveryFee = totalAmount > 50000 ? 0 : 3000;

  return {
    handleAllClick,
    handleCheckbox,
    checkedProducts,
    checkedProductIds,
    handleCheckDelete,
    totalAmount,
    delieveryFee,
  };
};
