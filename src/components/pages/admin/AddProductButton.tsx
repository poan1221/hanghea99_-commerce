import { Button } from "@/components/ui/button";
import { useNavigate } from "@/hooks/useNavigate";

export const AddProductButton = () => {
    const { moveAddProduct } = useNavigate();
  return (
    <div className="mb-4 flex justify-end">
      <Button
        className="bg-slate-700 hover:bg-slate-900"
        onClick={() => moveAddProduct()}
      >
        상품 등록 +
      </Button>
    </div>
  );
};
