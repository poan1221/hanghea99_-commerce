import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface QuantityButtonProps {
  quantity: number;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
}

export const QuantityButton = ({
  quantity,
  incrementQuantity,
  decrementQuantity,
}: QuantityButtonProps) => {
  return (
    <div className="flex items-center gap-1">
      <Button onClick={decrementQuantity} variant="outline" size="icon">
        <Minus className="h-4 w-4" />
      </Button>
      <p className="text-xl w-8 text-center">{quantity}</p>
      <Button onClick={incrementQuantity} variant="outline" size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};
