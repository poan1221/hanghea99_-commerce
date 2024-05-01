import { CATEGORIES } from "@/types/product";
import { Link } from "react-router-dom";
import { ProductList } from "@/pages/product";

export const Main = () => {
  return (
    <>
      {/* 홍보용 배너 */}
      <section className="promotion">
        <div className="promotionBanner">
          <img
            className="object-fill w-full max-h-[416px] h-full"
            src="https://firebasestorage.googleapis.com/v0/b/hanghea99-commerce.appspot.com/o/images%2FBanner.png?alt=media&token=f598b90a-98ee-4f49-af33-50a80ddca2c5"
            alt="promotionBanner"
          />
        </div>
      </section>
      {/* 최신 상품 리스트 _ 최대 16개 */}
      <ProductList></ProductList>
    </>
  );
};
