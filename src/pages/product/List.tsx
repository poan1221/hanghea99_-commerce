import { useQueryInitialProducts } from "@/api/productQueries";
import { ProductCard } from "@/components/Product/ProductCard";
import ProductCardSkelton from "@/components/Product/ProductCardSkelecton";
import { PageTitle } from "@/components/common/PageTItle";
import { SERIES, Series } from "@/types/product";
import { Link } from "react-router-dom";

export const ProductList = () => {
  return (
    <section className="container productsWrap max-w-4xl mt-11 mx-auto">
      {Object.entries(SERIES).map(([key, value]) => (
        <div key={key}>
          <div className="w-[860px] flex justify-between p-4 bg-[#f0eaeac9] my-5 rounded-md">
            <PageTitle title={value} alignLeft />
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
    <div className="grid grid-cols-2 gap-1 lg:grid-cols-4 :gap-5">
      {isLoading && <ProductCardSkelton productsPerRow={4} />}
      {data?.products.map((product) => (
        <ProductCard data={product} key={product.name} />
      ))}
    </div>
  );
};
