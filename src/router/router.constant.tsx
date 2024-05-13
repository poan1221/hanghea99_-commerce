import { Routes } from "./router.type";
import { Detail, ProductSelectedList, Cart, WishList } from "../pages/product";
import { Main, NotFound, Login, SignUp } from "../pages";
import { MyList, AddProduct, EditProduct } from "../pages/admin";

export const ROUTES: Routes = {
  HOME: {
    PATH: "/",
    isAuth: false,
    COMPONENT: Main,
  },

  LOGIN: {
    PATH: "/Login",
    isAuth: false,
    COMPONENT: Login,
  },

  SIGNUP: {
    PATH: "/SignUp",
    isAuth: false,
    COMPONENT: SignUp,
  },

  DETAIL: {
    PATH: "/detail/:id",
    isAuth: false,
    COMPONENT: Detail,
  },

  CART: {
    PATH: "/Mycart",
    isAuth: true,
    COMPONENT: Cart,
  },
  WISHLIST: {
    PATH: "/wishList",
    isAuth: true,
    COMPONENT: WishList,
  },

  MYLIST: {
    PATH: "/mylist",
    isAuth: true,
    COMPONENT: MyList,
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
