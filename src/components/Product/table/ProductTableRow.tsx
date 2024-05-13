import { userActionProduct } from "@/types/product";
import { useNavigate } from "@/hook/useNavigate";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/useUserStore";
import { toggleWishProduct } from "@/hook/useProductServies";
import { deleteCartProduct } from "@/hook/useOrderServies";
import { Badge } from "@/components/ui/badge";
import { addSpaceSeriesTitle } from "@/utils/addSpaceSeriesTitle";
import { useCartQuantity } from "@/hook/useQuantity";
import { QuantityButton } from "../QuantityButton";
import { useEffect, useState } from "react";

interface ProductTableRowProps {
  data: userActionProduct;
  isCartItem?: boolean;
  handleCheckbox: (id: string) => void;
}

export const ProductTableRow = ({
  data,
  isCartItem,
  handleCheckbox,
}: ProductTableRowProps) => {
  const { moveDetail } = useNavigate();
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();

  const deletListMutation = useMutation({
    mutationFn: () =>
      isCartItem
        ? deleteCartProduct(user!.uid as string, data.uid)
        : toggleWishProduct(user!.uid as string, data.uid),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: isCartItem
          ? ["userCartList", user!.uid]
          : ["userWishesList", user!.uid],
      });
    },
    onError: (error) => {
      console.error("오류가 발생하였습니다.:", error);
    },
  });

  const handleDelete = async () => {
    if (window.confirm("이 상품을 리스트에서 삭제 하시겠습니까?")) {
      deletListMutation.mutate();
    }
  };

  // 데이터는 반영되었지만, 상품 수량은 업데이트되지 않음
  // data.productQuantity 업데이트를 위해 여기서도 useState, useEffect 사용해야? 이게 맞나..? -> 근데 반영 안됨
  // 어디서부터 이해를 못한 건지?
  // console.log(" ----", data);
  // 왜 안되용
  const [initQuantity, setInitQuantity] = useState(data.productQuantity);
  useEffect(() => {
    setInitQuantity(data.productQuantity);
  }, [data]);

  const isCartItemButton = (isCartItem: boolean | undefined) => {
    if (isCartItem) {
      const { quantity, incrementQuantity, decrementQuantity } =
        useCartQuantity(initQuantity as number, [user!.uid, data.uid]);

      return (
        <div className="flex flex-col items-center justify-center">
          <QuantityButton
            quantity={quantity}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />
          {initQuantity && (
            <div className="text-lg text-slate-900 font-bold pt-2">
              ₩ {Number(data.price * initQuantity).toLocaleString("ko-KR")}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="poductTableRow w-100 flex justify-between col-span-full pt-3 pb-2">
      <div className="IProductInfo flex">
        <div className="mr-3">
          <Checkbox
            checked={data.isChecked}
            onClick={() => handleCheckbox(data.uid)}
          />
        </div>
        <div
          className="w-[105px] h-[105px] mr-4 cursor-pointer"
          onClick={() =>
            moveDetail(data.uid, {
              state: {
                product: data,
              },
            })
          }
        >
          <img className="size-full object-cover" src={data.image} />
        </div>
        <div className="flex flex-col gap-1 text-left justify-center">
          <div className="flex gap-1">
            <Badge>{addSpaceSeriesTitle(data.series)}</Badge>
            <Badge variant="indigo">{addSpaceSeriesTitle(data.category)}</Badge>
          </div>
          <div className="text-slate-900 text-base font-medium">
            {data.name}
          </div>
          <div className="text-slate-900 text-base">
            ₩ {Number(data.price).toLocaleString("ko-KR")}
          </div>
        </div>
      </div>
      <div className="btnBox flex gap-4">
        {isCartItemButton(isCartItem)}
        <Button
          variant="ghost"
          className="font-normal text-lg text-slate-500"
          onClick={handleDelete}
        >
          X
        </Button>
      </div>
    </div>
  );
};
