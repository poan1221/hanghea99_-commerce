import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  productsPerRow: number;
}

const ProductCardSkelton = ({ productsPerRow }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {Array.from({ length: productsPerRow }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3 mb-4">
          <Skeleton className="h-[173px]" />
          <div className="pt-4">
            <Skeleton className="h-4 w-[150px] mb-2" />
            <Skeleton className="h-4 w-[50px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCardSkelton;
