import { UserActionProduct } from "@/types/product";
import { ProductTableRow } from "@/components/Product/table/ProductTableRow";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/useUserStore";
import { deleteCartProduct } from "@/hook/useOrderServies";
import { toggleWishProduct } from "@/hook/useProductServies";

interface ProductListProps {
  products: UserActionProduct[];
  isCart?: boolean;
}

export const ProductTableList = ({
  products: data,
  isCart = false,
}: ProductListProps) => {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
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

  const deletListMutation = useMutation({
    mutationFn: (productUid: string) =>
      isCart
        ? deleteCartProduct(user!.uid as string, productUid)
        : toggleWishProduct(user!.uid as string, productUid),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: isCart
          ? ["userCartList", user!.uid]
          : ["userWishesList", user!.uid],
      });
    },
    onError: (error) => {
      console.error("오류가 발생하였습니다.:", error);
    },
  });

  const handleCheckDelete = async () => {
    if (window.confirm("선택한 상품을 리스트에서 삭제 하시겠습니까?")) {
      checkedProducts.forEach((product) => {
        deletListMutation.mutate(product.uid);
      });
    }
  };

  // 체크된 상품으로만 총 금액 계산
  const [totalAmount, setTotalAmount] = useState(0);
  const checkedProducts = products.filter((x) => x.isChecked);
  useEffect(() => {
    setTotalAmount(
      checkedProducts.reduce(
        (acc, cur) => acc + cur.price * cur.productQuantity!,
        0
      )
    );
  }, [checkedProducts]);
  const delieveryFee = totalAmount > 50000 ? 0 : 3000;

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
            {data.map((product) => (
              <ProductTableRow
                isCartItem={isCart}
                data={product}
                key={product.name}
                handleCheckbox={handleCheckbox}
              />
            ))}
          </div>
          {isCart && (
            <div>
              <div className="flex flex-col items-end py-4 gap-2 border-t border-slate-900">
                <div className="inline-flex gap-4 items-top">
                  <div className="text-sm">선택 상품 금액</div>
                  <div className="font-bold text-3xl text-red-500">
                    {totalAmount.toLocaleString("ko-KR")} 원
                  </div>
                </div>
                <div className="inline-flex gap-4 items-top">
                  <div className="text-sm text-gray-500">
                    배송비 (50,000원 이상 무료)
                  </div>
                  <div className="text-sm text-gray-800">
                    {delieveryFee.toLocaleString("ko-KR")} 원
                  </div>
                </div>
              </div>
              <div className="w-full text-center">
                <Button
                  className="w-1/3"
                  disabled={checkedProducts.length < 1}
                  onClick={() => alert("구매하기")}
                >
                  선택 상품 구매하기
                </Button>
                <div className="flex justify-end w-full"></div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
