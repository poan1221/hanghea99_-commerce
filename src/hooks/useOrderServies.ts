import { db } from "@/firebase";
import { UserActionProduct } from "@/types/product";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  where,
} from "firebase/firestore";

/**
 * 사용자가 선택 상품을 장바구니에 담는 기능입니다. Firestore 트랜잭션을 사용하여 상품 재고를 확인하여 동기화합니다.
 * @param {string} userId - 사용자 ID입니다.
 * @param {string} productId - 장바구니에 담을 상품의 ID입니다.
 * @param {number} productQuantity - 장바구니에 담을 상품의 수량입니다.
 * @returns {Promise<void>} - 함수 실행 후 반환 값 얻음.
 */
export const addCartProduct = async (
  userId: string,
  productId: string,
  productQuantity: number
) => {
  const userCartRef = collection(db, "userCarts");
  const cartRef = doc(userCartRef, `${userId}_${productId}`);
  const productRef = doc(db, "products", productId);

  await runTransaction(db, async (transaction) => {
    const cartSnap = await transaction.get(cartRef);
    const productSnap = await transaction.get(productRef);

    if (!productSnap.exists()) {
      throw new Error("product does not exist!");
    } else if (productSnap.data().quantity < productQuantity) {
      throw new Error("Not enough quantity!");
    }

    if (cartSnap.exists()) {
      const ableQuantity =
        productSnap.data().quantity - cartSnap.data().productQuantity;
      if (ableQuantity < productQuantity) {
        throw new Error("Not enough quantity!");
      }

      transaction.update(cartRef, {
        productQuantity: cartSnap.data().productQuantity + productQuantity,
        cartedAt: new Date(),
      });
    } else {
      transaction.set(cartRef, {
        userId,
        productId,
        productQuantity,
        cartedAt: new Date(),
      });
    }
  });
};

/**
 * 사용자가 장바구니에 담겨있는 상품의 수량을 조정하는 기능입니다. Firestore 트랜잭션을 사용하여 상품 재고를 확인하여 동기화합니다.
 * @param {string} userId - 사용자 ID입니다.
 * @param {string} productId - 장바구니에 담을 상품의 ID입니다.
 * @param {number} productQuantity - 장바구니 상품의 수량입니다.
 * @returns {Promise<void>} - 함수 실행 후 반환 값 얻음.
 */
export const updateCartQuantity = async (
  userId: string,
  productId: string,
  productQuantity: number
) => {
  const userCartRef = collection(db, "userCarts");
  const cartRef = doc(userCartRef, `${userId}_${productId}`);
  const productRef = doc(db, "products", productId);

  await runTransaction(db, async (transaction) => {
    const cartSnap = await transaction.get(cartRef);
    const productSnap = await transaction.get(productRef);

    if (!productSnap.exists()) {
      throw new Error("product does not exist!");
    } else if (productSnap.data().quantity < productQuantity) {
      throw new Error("Not enough quantity!");
    }

    if (cartSnap.exists()) {
      transaction.update(cartRef, {
        productQuantity: productQuantity,
        cartedAt: new Date(),
      });
    }
  });

  return productQuantity;
};

/**
 * 사용자가 선택 상품을 장바구니에서 삭제하는 기능입니다. Firestore 트랜잭션을 사용하여 상품 재고를 확인하여 동기화합니다.
 * @param {string} userId - 사용자 ID입니다.
 * @param {string} productId - 장바구니에 담을 상품의 ID입니다.
 * @returns {Promise<void>} - 함수 실행 후 반환 값 얻음.
 */
export const deleteCartProduct = async (userId: string, productId: string) => {
  const userCartRef = collection(db, "userCarts");
  const cartRef = doc(userCartRef, `${userId}_${productId}`);

  await runTransaction(db, async (transaction) => {
    const cartSnap = await transaction.get(cartRef);

    if (cartSnap.exists()) {
      transaction.delete(cartRef);
    }
  });
};

/**
 * 장바구니 상품 목록 전체를 가져옵니다.
 * @param {string} userId - 사용자 ID입니다.
 * @returns {Promise<UserActionProduct>} - 장바구니 상품 목록
 */
export const getUserCartProduct = async (userId: string) => {
  const userCartRef = collection(db, "userCarts");
  let q = query(
    userCartRef,
    where("userId", "==", userId),
    orderBy("cartedAt", "desc")
  );

  const snapshot = await getDocs(q);

  const productQuantities = snapshot.docs.map(
    (doc) => doc.data().productQuantity
  );
  const productIds = snapshot.docs.map((doc) => doc.data().productId);
  const products = await Promise.all(
    productIds.map(async (productId, index) => {
      const productRef = doc(db, "products", productId);
      const productSnap = await getDoc(productRef);
      return {
        isChecked: false,
        productQuantity: productQuantities[index],
        ...(productSnap.data() as UserActionProduct),
      };
    })
  );

  return products;
};
