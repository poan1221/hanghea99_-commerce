import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  productsPerRow: number;
}

const ProductCardSkelton = ({ productsPerRow }: Props) => {
  return (
    <>
      {Array.from({ length: productsPerRow }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3 mb-4">
          <Skeleton className="w-[270px] h-[270px]" />
          <div className="pt-4">
            <Skeleton className="h-4 w-[250px] mb-2" />
            <Skeleton className="h-4 w-[50px]" />
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCardSkelton;
