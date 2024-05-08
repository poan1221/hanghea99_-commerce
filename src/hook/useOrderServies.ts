import { db } from "@/firebase";
import { collection, doc, runTransaction } from "firebase/firestore";

/**
 * 사용자가 선택 상품을 장바구니에 담는 기능입니다. Firestore 트랜잭션을 사용하여 상품 재고를 확인하여 동기화합니다.
 * @param {string} userId - 사용자 ID입니다.
 * @param {string} productId - 장바구니에 담을 상품의 ID입니다.
 * @param {number} productQuantity - 장바구니에 담을 상품의 수량입니다.
 * @returns {Promise<void>} - 함수 실행 후 반환 값 없음.
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
