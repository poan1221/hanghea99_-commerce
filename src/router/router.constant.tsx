import { Routes } from "./router.type";
import { Detail, ProductSelectedList, WishList } from "@/pages/product";
import { Main, NotFound, Login, SignUp, Cart } from "@/pages";
import { MyProductList, AddProduct, EditProduct } from "@/pages/admin";

export const ROUTES: Routes = {
  HOME: {
    PATH: "/",
    isAuth: false,
    COMPONENT: Main,
  },

  LOGIN: {
    PATH: "/login",
    isAuth: false,
    COMPONENT: Login,
  },

  SIGNUP: {
    PATH: "/signUp",
    isAuth: false,
    COMPONENT: SignUp,
  },

  DETAIL: {
    PATH: "/detail/:id",
    isAuth: false,
    COMPONENT: Detail,
  },

  CART: {
    PATH: "/cart",
    isAuth: true,
    COMPONENT: Cart,
  },
  WISHLIST: {
    PATH: "/wishList",
    isAuth: true,
    COMPONENT: WishList,
  },

  MYLIST: {
    PATH: "/myProductList",
    isAuth: true,
    COMPONENT: MyProductList,
  },

  ADDPRODUCT: {
    PATH: "/addProduct",
    isAuth: true,
    COMPONENT: AddProduct,
  },

  EDITPRODUCT: {
    PATH: "/editProduct/:id",
    isAuth: true,
    COMPONENT: EditProduct,
  },

  CATEGORYLIST: {
    PATH: "/category/:id",
    isAuth: false,
    COMPONENT: ProductSelectedList,
  },

  SERIESLIST: {
    PATH: "/series/:id",
    isAuth: false,
    COMPONENT: ProductSelectedList,
  },
  // 추가...

  //   ORDER: {
  //     PATH: "/order",
  //     COMPONENT: Order,
  //   },

  //   ORDER_LIST: {
  //     PATH: "/orderList",
  //     COMPONENT: OrderList,
  //   },

  //   ORDER_DETAIL: {
  //     PATH: "/orderDetail",
  //     COMPONENT: OrderDetail,
  //   },

  // NOT_FOUND: {
  //   PATH: "*",
  //   COMPONENT: NotFound,
  // },
} as const;
