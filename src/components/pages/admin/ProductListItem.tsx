import { ProductInfo } from "@/types/product";
import { IconButton } from "@/components/common/IconButton";

interface ProductListItemProps {
  data: ProductInfo;
  onEdit: (data: ProductInfo) => void;
  onDelete: (data: ProductInfo) => void;
}

export const ProductListItem = (props: ProductListItemProps) => {
  const { data, onDelete, onEdit } = props;
  return (
    <div className="productItem w-100 flex justify-between">
      <div className="IProductInfo flex">
        <div className="w-[105px] h-[105px] mr-3">
          <img className="size-full object-cover" src={data.image} />
        </div>
        <div className="flex flex-col gap-[6px] pt-2 text-left">
          <div className="text-slate-900 font-medium text-sm">{data.name}</div>
          <div className="text-slate-900 text-base font-bold">
            ₩ {Number(data.price).toLocaleString("ko-KR")}
          </div>
          {data.quantity === 0 ? (
            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
              sold out
            </span>
          ) : (
            <p className="font-medium text-sm text-slate-500">
              수량 : {data.quantity}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <IconButton
          iconType="edit"
          label="수정하기"
          className="bg-slate-200 text-stone-700 hover:bg-slate-400"
          onClick={() => onEdit(data)}
        ></IconButton>
        <IconButton
          iconType="delete"
          label="삭제하기"
          className="bg-red-600 text-white hover:bg-red-800"
          onClick={() => onDelete(data)}
        ></IconButton>
      </div>
    </div>
  );
};
