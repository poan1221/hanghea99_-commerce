import { IProductInfo } from "@/types/product";
import { WishedButton } from "../WishedButton";
import { useNavigate } from "@/hooks/useNavigate";

interface ProductCardProps {
  data: IProductInfo;
}

export const ProductCard = (props: ProductCardProps) => {
  const data = props.data;
  const { moveDetail } = useNavigate();
  return (
    <div
      className="poductCard cursor-pointer text-left p-3 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out"
      onClick={() =>
        moveDetail(data.uid, {
          state: {
            product: data,
          },
        })
      }
    >
      <div className="imgBoxWrap relative z-20">
        {data.quantity === 0 ? (
          <div className="absolute left-4 top-4 z-20">
            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
              sold out
            </span>
          </div>
        ) : null}
        <div className="w-100 h-100 min-h-[170px]">
          <img className="size-full object-cover" src={data.image} />
        </div>
        <div className="absolute right-0 bottom-0">
          <WishedButton productUID={data.uid} />
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
