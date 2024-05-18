import { productFormInputProps } from "@/components/form/form.constant";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { UseFormReturn } from "react-hook-form";

export interface ProductInfo {
  sellerId?: string;
  uid: string;
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  series: string;
  quantity: number;
  createdAt: number;
}

export interface ProductFormTypes {
  sellerId?: string;
  uid?: string;
  name: string;
  image: File | string | null;
  category: Category;
  series: Series;
  quantity: number;
  price: number;
  description: string;
}

export type OptionMap = { [key: string]: string };

export const CATEGORIES: OptionMap = {
  Clothes: "의류",
  Accessories: "악세사리",
  OfficeItems: "문구",
  PhotoCard: "포토카드",
  Ect: "기타",
} as const;

export type Category = keyof typeof CATEGORIES;

export const SERIES: OptionMap = {
  WaitForYou: "기다릴게",
  PixelWorld: "픽셀월드",
  Why: "왜요왜요왜",
  The6thSummer: "여섯번째 여름",
  SeasonGreeting: "시즌그리팅",
  W4L: "W4L",
  FanConcert: "팬콘서트",
} as const;

export type Series = keyof typeof SERIES;

export interface ProductsResponse {
  products: ProductInfo[];
  nextPage: QueryDocumentSnapshot<DocumentData> | null;
}

export interface WishProduct {
  id: string;
  productId: string;
  userId: string;
  wishedAt: number;
}

export interface UserActionProduct extends ProductInfo {
  productQuantity?: number;
  isChecked?: boolean;
}

export interface FormInputProps {
  input: productFormInputProps;
  form: UseFormReturn<ProductFormTypes>;
}

export interface SelectFormProps extends FormInputProps {
  options: OptionMap;
}