export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  imageURL: string;
  category: string;
  quantity: number;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}
