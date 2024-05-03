import { useQueryInitialProducts } from "@/api/productQueries";
import { ProductCard } from "@/components/Product/ProductCard";
import ProductCardSkelton from "@/components/Product/ProductCardSkelecton";
import { SERIES, Series } from "@/types/product";
import { Link } from "react-router-dom";

// 데이터 안 나올 때 리스트가 아예 안나오게 상태 관리..?
export const ProductCategoryList = () => {
  return (
    <section className="container productsWrap max-w-4xl mt-11 mx-auto">
      ==== 카테고리별 상품 리스트 ====
    </section>
  );
};

type ProductPreviwProps = {
  series: Series;
};

const ProductPreview = ({ series }: ProductPreviwProps) => {
  const { data, isLoading } = useQueryInitialProducts(series);

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {isLoading && <ProductCardSkelton productsPerRow={4} />}
      {data?.products.map((product) => (
        <ProductCard data={product} key={product.name} />
      ))}
    </div>
  );
};
