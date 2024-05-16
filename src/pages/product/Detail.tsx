import { CartButton } from "@/components/pages/product/CartButton";
import { QuantityButton } from "@/components/pages/product/QuantityButton";
import { IconButton } from "@/components/common/IconButton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@/hooks/useNavigate";
import { useQuantity } from "@/hooks/useQuantity";
import { addSpaceSeriesTitle } from "@/utils/addSpaceSeriesTitle";

export const Detail = () => {
  const {
    locationState: { product },
    moveBack,
    moveSeriesList,
    moveCategoryList,
  } = useNavigate();

  const { quantity, incrementQuantity, decrementQuantity } = useQuantity(1);

  const totalPrice = product.price * quantity;

  const handleBuyNow = () => {
    // 여기에서는 구매를 진행하기 위한 로직을 추가할 수 있어요.
    console.log(`구매할 상품 수량: ${quantity}`);
  };

  return (
    <section className="container">
      <div className="datailHeader py-4 flex items-center">
        <div onClick={() => moveBack()}>
          <IconButton
            iconType="arrowBack"
            className="bg-transparent text-slate-600 hover:bg-transparent hover:text-slate-900 p-0"
          />
        </div>
        <div className="font-bold text-xl w-[calc(100%-40px)]">
          상품 상세 정보
        </div>
      </div>
      <div className="productWrap flex flex-col lg:flex-row lg:gap-3">
        <div className="w-full lg:w-1/2">
          <img
            className="w-full h-full object-cover"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="w-full lg:w-1/2 border-t-2 border-slate-900 text-left">
          <div className="flex gap-1 pt-4 pb-2">
            <Button size="badge" onClick={() => moveSeriesList(product.series)}>
              {addSpaceSeriesTitle(product.series)}
            </Button>
            <Button
              size="badge"
              variant="indigo"
              onClick={() => moveCategoryList(product.category)}
            >
              {addSpaceSeriesTitle(product.category)}
            </Button>
          </div>
          <div className="font-medium text-xl">{product.name}</div>
          <table className="w-[100%]">
            <colgroup>
              <col className="w-[100px]" />
              <col />
            </colgroup>
            <tbody>
              <tr className="text-gray-500">
                <td className="font-medium py-4">판매 금액</td>
                <td className="text-gray-900 text-xl font-bold">
                  {Number(product.price).toLocaleString("ko-KR")} 원
                </td>
              </tr>
              <tr className="text-gray-500 font-medium">
                <td>배송비</td>
                <td>3,000원 (50,000원 이상 구매 시 무료)</td>
              </tr>
            </tbody>
          </table>
          <div className="py-4 border-t mt-4">
            <div className="flex items-center">
              <div className="w-[100px]">구매 수량</div>
              <QuantityButton
                quantity={quantity}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
              />
            </div>
          </div>
          {totalPrice > 0 && (
            <div className="py-4 border-t-2 border-slate-700 text-right">
              <div className="inline-flex gap-4 items-top">
                <div className="text-sm">총 상품 금액</div>
                <div className="font-bold text-3xl text-red-500">
                  {Number(totalPrice).toLocaleString("ko-KR")} 원
                </div>
              </div>
            </div>
          )}
          <div className="py-4 flex">
            {product.quantity === 0 ? (
              <Button className="w-full text-lg rounded-none" disabled>
                품절
              </Button>
            ) : (
              <CartButton productUID={product.uid} productQuantity={quantity} />
            )}
            <Button
              className="w-1/2 text-lg bg-white hover:bg-slate-100 border text-slate-900 rounded-none"
              onClick={handleBuyNow}
            >
              바로 구매
            </Button>
          </div>
        </div>
      </div>
      <div className="productDescription mt-4 text-left">
        <div className="font-bold text-lg">상세 정보</div>
        <div className="mt-4">{product.description}</div>
      </div>
    </section>
  );
};
