import { ProductCard } from "@/components/pages/product/card/ProductCard";
import { ProductInfo } from "@/types/product";

interface ProductListProps {
  products: ProductInfo[];
}

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <>
      {products.length === 0 ? (
        <div className="text-center">추가된 상품이 존재하지 않습니다.</div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard data={product} key={product.name} />
          ))}
        </div>
      )}
    </>
  );
};
