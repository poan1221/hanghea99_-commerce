import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export interface IProductInfo {
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

export interface IProductForm {
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

type OptionMap = { [key: string]: string };

export const CATEGORIES: OptionMap = {
  Clothes: "의류",
  Accessories: "악세사리",
  OfficeSupplies: "문구",
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
  products: IProductInfo[];
  nextPage: QueryDocumentSnapshot<DocumentData> | null;
}

export interface WishProduct {
  id: string;
  productId: string;
  userId: string;
  wishedAt: number;
}
