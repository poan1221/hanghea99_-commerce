import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  productsPerRow: number;
}

export const ProductTableSkelton = ({ productsPerRow }: Props) => {
  return (
    <div>
      {Array.from({ length: productsPerRow }).map((_, i) => (
        <div key={i} className="w-100 flex justify-between">
          <div className="flex">
            <div className="mr-3">
              <Checkbox />
            </div>
            <Skeleton className="w-[105px] h-[105px] mr-3" />
            <div className="flex pt-2">
              <Skeleton className="h-4 w-[150px] mb-2" />
              <Skeleton className="h-4 w-[50px]" />
            </div>
          </div>
          <div className="flex gap-4">
            <Skeleton className="w-20 h-10" />
            <Skeleton className="w-20 h-10" />
          </div>
        </div>
      ))}
    </div>
  );
};
