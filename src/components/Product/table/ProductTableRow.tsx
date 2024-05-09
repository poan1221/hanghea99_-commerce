import { userActionProduct } from "@/types/product";
import { useNavigate } from "@/hook/useNavigate";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface ProductTableRowProps {
  data: userActionProduct;
  isCartItme?: boolean;
  handleDelete: (id: string) => void;
  handleCheckbox: (id: string) => void;
}

export const ProductTableRow = ({
  data,
  isCartItme,
  handleDelete,
  handleCheckbox,
}: ProductTableRowProps) => {
  const { moveDetail } = useNavigate();
  return (
    <div className="poductTableRow w-100 flex justify-between col-span-full">
      <div className="IProductInfo flex">
        <div className="mr-3">
          <Checkbox
            checked={data.isChecked}
            onClick={() => handleCheckbox(data.uid)}
          />
        </div>
        <div
          className="w-[105px] h-[105px] mr-3 cursor-pointer"
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
        <div className="flex flex-col gap-[6px] pt-2 text-left">
          <div className="text-slate-900 font-medium text-sm">{data.name}</div>
          <div className="text-slate-900 text-base font-bold">
            ₩ {Number(data.price).toLocaleString("ko-KR")}
          </div>
        </div>
      </div>
      <div className="btnBox flex gap-4">
        {isCartItme && <Button>어쩌고</Button>}
        <Button
          variant="ghost"
          className="font-normal text-lg text-slate-500"
          onClick={() => handleDelete(data.uid)}
        >
          X
        </Button>
      </div>
    </div>
  );
};

// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import { TableCell, TableRow } from "@/components/ui/table"
// import { useQuantity } from "@/hooks/useQuantity"
// import { QuantityButton } from "../ProductDetail/QuantityButton"
// import { CartProduct } from "@/types";

// interface CartRowProps {
//   product: CartProduct;
//   handleDelete: (id: string) => void;
//   handleCheckbox: (id: string) => void;
// }

// const CartRow = ({ product, handleDelete, handleCheckbox }: CartRowProps) => {

//   const { quantity, incrementQuantity, decrementQuantity } = useQuantity(product.quantity, product.id);

//   return (
//     <TableRow>
//       <TableCell className="font-medium flex items-center">
//         <img src={product.imageUrl} className="w-20 mr-5" />
//         {product.name}</TableCell>
//       <TableCell className="text-center">{product.price}</TableCell>
//       <TableCell className="text-center">
//         <QuantityButton quantity={quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} />
//       </TableCell>
//       <TableCell className="text-center"><Button onClick={() => handleDelete(product.id)}>삭제</Button></TableCell>
//       <TableCell><Checkbox checked={product.isChecked} onClick={(() => handleCheckbox(product.id))} /></TableCell>
//     </TableRow>
//   )
// }

// export default CartRow
