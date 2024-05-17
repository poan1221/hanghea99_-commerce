import { UserActionProduct } from "@/types/product";
import { useNavigate } from "@/hooks/useNavigate";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import { toggleWishProduct } from "@/hooks/useProductServies";
import { deleteCartProduct } from "@/hooks/useOrderServies";
import { Badge } from "@/components/ui/badge";
import { addSpaceSeriesTitle } from "@/utils/addSpaceSeriesTitle";
import { useCartQuantity } from "@/hooks/useQuantity";
import { QuantityButton } from "@/components/pages/product/QuantityButton";
import { useDeleteSelectProduct } from "@/hooks/useDeleteSelectProduct";

interface ProductTableRowProps {
  data: UserActionProduct;
  isCartItem?: boolean;
  isChecked: boolean;
  handleCheckbox: (id: string) => void;
}

export const ProductTableRow = ({
  data,
  isCartItem,
  isChecked,
  handleCheckbox,
}: ProductTableRowProps) => {
  const { moveDetail } = useNavigate();
  const user = useUserStore((state) => state.user);
  const { quantity, incrementQuantity, decrementQuantity } = useCartQuantity(
    data.productQuantity as number,
    [user!.uid, data.uid]
  );

  const deleteListMutation = useDeleteSelectProduct({
    mutationFn: (productUid: string) =>
      isCartItem
        ? deleteCartProduct(user!.uid as string, productUid)
        : toggleWishProduct(user!.uid as string, data.uid),
    queryKey: isCartItem
      ? ["userCartList", user!.uid]
      : ["userWishesList", user!.uid],
  });

  const handleDelete = async () => {
    if (window.confirm("이 상품을 리스트에서 삭제 하시겠습니까?")) {
      deleteListMutation.mutate(data.uid);
    }
  };

  return (
    <div className="poductTableRow w-100 flex justify-between col-span-full pt-3 pb-2">
      <div className="IProductInfo flex">
        <div className="mr-3">
          <Checkbox
            checked={isChecked}
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
        {isCartItem && (
          <div className="flex flex-col items-center justify-center">
            <QuantityButton
              quantity={quantity}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
            />
            {data.productQuantity && (
              <div className="text-lg text-slate-900 font-bold pt-2">
                ₩{" "}
                {Number(data.price * data.productQuantity).toLocaleString(
                  "ko-KR"
                )}
              </div>
            )}
          </div>
        )}
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
