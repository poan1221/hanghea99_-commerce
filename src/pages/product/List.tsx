import { useQueryInitialProducts } from "@/api/productQueries";
import { ProductCard } from "@/components/Product/ProductCard";
import ProductCardSkelton from "@/components/Product/ProductCardSkelecton";
import { SERIES, Series } from "@/types/product";
import { Link } from "react-router-dom";

// 데이터 안 나올 때 리스트가 아예 안나오게 상태 관리..?
export const ProductList = () => {
  return (
    <section className="container productsWrap max-w-4xl mt-11 mx-auto">
      {Object.entries(SERIES).map(([key, value]) => (
        <div key={key}>
          <div className="w-100 flex justify-between items-center py-4">
            <h2 className="text-slate-900 font-bold text-4xl">{value}</h2>
            <Link to={`/${key}`}>더보기</Link>
          </div>
          <ProductPreview series={key} />
        </div>
      ))}
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
