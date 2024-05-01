import { useQueryInitialProducts } from "@/api/productQueries";
import { ProductCard } from "@/components/Product/ProductCard";
import ProductCardSkelton from "@/components/Product/ProductCardSkelecton";
import { PageTitle } from "@/components/common/PageTItle";
import { useNavigate } from "@/hook/useNavigate";
import { deleteProduct } from "@/hook/useProductServies";
import { IProductInfo, SERIES, Series } from "@/types/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export const ProductList = () => {
  const queryClient = useQueryClient();
  // const wishProductMutation = useMutation({
  //   mutationFn: (data: IProductInfo) => wishProduct(data),
  //   onSuccess: (result) => {
  //     if (result.success) {
  //       queryClient.invalidateQueries({
  //         queryKey: ["wish"],
  //       });
  //     }
  //   },
  //   onError: (error) => {
  //     console.error("오류가 발생하였습니다.:", error);
  //   },
  // });

  const handleProductLiked = async (data: IProductInfo) => {
    // console.log(data);

    if (window.confirm("이 상품을 위시리스트에 담으시겠습니까?")) {
      // wishProductMutation.mutate(data);
    }
  };

  return (
    <section className="container productsWrap max-w-4xl mt-11 mx-auto">
      {Object.entries(SERIES).map(([key, value]) => (
        <div key={key}>
          <div className="w-[860px] flex justify-between p-4 bg-[#f0eaeac9] my-5 rounded-md">
            <PageTitle title={value} alignLeft />
            <Link to={`/${key}`}>더보기</Link>
          </div>
          <ProductPreview
            handleProductLiked={handleProductLiked}
            series={key}
          />
        </div>
      ))}
    </section>
  );
};

type ProductPreviwProps = {
  series: Series;
  handleProductLiked: (data: IProductInfo) => void;
};

const ProductPreview = ({ series, handleProductLiked }: ProductPreviwProps) => {
  const { data, isLoading } = useQueryInitialProducts(series);

  // console.log(data);
  const { moveDetail } = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-1">
      {isLoading && <ProductCardSkelton productsPerRow={4} />}
      {data?.products.map((product) => (
        <ProductCard
          data={product}
          key={product.name}
          onLiked={() => handleProductLiked(product)}
          onClickCard={() =>
            moveDetail(product.uid, {
              state: {
                product,
              },
            })
          }
        />
      ))}
    </div>
  );
};
