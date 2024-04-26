import { PageTitle } from "@/components/common/PageTItle";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@/hook/useNavigate";

export const MyList = () => {
  const { moveAddProduct } = useNavigate();
  return (
    <section className="max-w-6xl section-py mx-auto">
      <PageTitle title="My List" alignLeft />
      <div className="mb-4 flex justify-end">
        <Button onClick={() => moveAddProduct()}>상품 등록 +</Button>
      </div>
    </section>
  );
};
