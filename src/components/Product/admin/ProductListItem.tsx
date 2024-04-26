import { IProductInfo } from "@/types/product";
import { IconButton } from "@/components/common/IconButton";

interface ProductListItemProps {
  data: IProductInfo;
  onEdit: (data: IProductInfo) => void;
  onDelete: (data: IProductInfo) => void;
}

const ProduectListItem = ({ data, onDelete, onEdit }: ProductListItemProps) => {
  return (
    <div className="max-w-5xl flex">
      <div className="IProductInfo flex">
        <div className="w-[105px] h-[105px] bg-slate-400 mr-3">
          <img src={data.imageURL} />
        </div>
        <div className="pt-2 py-[6px]">
          <div className="text-slate-900 font-medium text-sm">{data.name}</div>
          <div className="text-slate-900 text-base">
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
      <div>
        <IconButton
          iconType="delect"
          label="삭제하기"
          className="bg-red-600 text-white"
          onClick={() => onDelete(data)}
        ></IconButton>
        <IconButton
          iconType="edit"
          label="수정하기"
          className="bg-slate-400 text-stone-700"
          onClick={() => onEdit(data)}
        ></IconButton>
      </div>
    </div>
  );
};
