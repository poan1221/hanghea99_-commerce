interface TotalPriceProps {
  totalAmount: number;
  delieveryFee: number;
}

export const TotalPrice = (props: TotalPriceProps) => {
  const { totalAmount, delieveryFee } = props;
  return (
    <div className="flex flex-col items-end py-4 gap-2 border-t border-slate-900">
      <div className="inline-flex gap-4 items-top">
        <div className="text-sm">선택 상품 금액</div>
        <div className="font-bold text-3xl text-red-500">
          {totalAmount.toLocaleString("ko-KR")} 원
        </div>
      </div>
      <div className="inline-flex gap-4 items-top">
        <div className="text-sm text-gray-500">배송비 (50,000원 이상 무료)</div>
        <div className="text-sm text-gray-800">
          {delieveryFee.toLocaleString("ko-KR")} 원
        </div>
      </div>
    </div>
  );
};
