import { IProductInfo } from "@/types/product";
import { IconButton } from "@/components/common/IconButton";

interface ProductCardProps {
  data: IProductInfo;
  onClickCard: (data: IProductInfo) => void;
  onLiked: (data: IProductInfo) => void;
}

export const ProductCard = (props: ProductCardProps) => {
  const { data, onLiked, onClickCard } = props;

  const handleLiked = (event: React.MouseEvent) => {
    event.stopPropagation();
    onLiked(data);
  };

  return (
    <div
      className="poductCard cursor-pointer"
      onClick={() => onClickCard(data)}
    >
      <div className="imgBoxWrap relative">
        {data.quantity === 0 ? (
          <div className="absolute left-4 top-4 z-20">
            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
              sold out
            </span>
          </div>
        ) : null}
        <div className="w-100 h-100">
          <img className="size-full object-cover" src={data.image} />
        </div>
        <div className="absolute right-[14px] bottom-[14px]">
          <IconButton iconType="liked" onClick={handleLiked} />
        </div>
      </div>
      <div className="pt-4 pb-2 text-slate-900 font-medium text-sm">
        {data.name}
      </div>
      <div className="text-slate-900 text-base font-bold">
        ₩ {Number(data.price).toLocaleString("ko-KR")}
      </div>
    </div>
  );
};
