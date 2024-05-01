import { IProductInfo, IProductForm } from "@/types/product";

// 이벤트 데이터를 폼 데이터로 변환하는 함수
export function transformdataToFormValues(data: IProductInfo): IProductForm {
  return {
    image: data.image, // Blob 형태로 변환 필요할 경우 별도 로직 구현
    name: data.name,
    price: data.price,
    category: data.category,
    series: data.series,
    description: data.description,
    quantity: data.quantity,
  };
}
