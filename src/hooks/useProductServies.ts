import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  where,
  orderBy,
  query,
  startAfter,
  limit,
  QueryDocumentSnapshot,
  DocumentData,
  runTransaction,
  getDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { db, storage } from "@/firebase";
import {
  CATEGORIES,
  Category,
  ProductForm,
  ProductInfo,
  ProductsResponse,
  Series,
  WishProduct,
  UserActionProduct,
} from "@/types/product";

export const UseAddProduct = () => {
  const addProduct = async (userData: ProductForm) => {
    // firestore에 product 추가
    const productId = doc(collection(db, "products")).id;

    // Storage에 thumbnail 업로드
    const storageRef = ref(storage, `images/${productId}.webp`);
    const fileSnapshot = await uploadBytes(storageRef, userData.image as File);
    const thumbnailUrl = await getDownloadURL(fileSnapshot.ref);

    try {
      const productDocRef = doc(db, "products", productId);
      await setDoc(productDocRef, {
        sellerId: userData.sellerId,
        uid: productId,
        image: thumbnailUrl,
        name: userData.name,
        category: userData.category,
        series: userData.series,
        description: userData.description,
        price: userData.price,
        quantity: userData.quantity,
        createdAt: new Date(),
      });

      alert("상품이 등록되었습니다.");
      return { success: true, productId };
    } catch (error) {
      return { success: false, error: error };
    }
  };

  return addProduct;
};

export const UseEditProduct = () => {
  const editProduct = async (data: ProductForm) => {
    const productId = doc(collection(db, "products")).id;

    // Thumbnail이 파일인지 확인
    const isFile = data.image instanceof File;

    // Storage에 새로운 Thumbnail 업로드
    let thumbnailUrl = "";
    if (isFile) {
      const storageRef = ref(storage, `images/${productId}.webp`);
      const fileSnapshot = await uploadBytes(storageRef, data.image as File);
      thumbnailUrl = await getDownloadURL(fileSnapshot.ref);
    } else {
      // 파일이 아닌 경우는 기존 썸네일 URL 그대로 사용
      thumbnailUrl = data.image as string;
    }

    try {
      const productDocRef = doc(db, "products", data.uid!);
      await updateDoc(productDocRef, {
        sellerId: data.sellerId,
        uid: data.uid,
        image: thumbnailUrl,
        name: data.name,
        category: data.category,
        series: data.series,
        description: data.description,
        price: data.price,
        quantity: data.quantity,
        createdAt: new Date(),
      });

      alert("상품이 수정되었습니다.");
      return { success: true, productId };
    } catch (error) {
      return { success: false, error: error };
    }
  };

  return editProduct;
};

export const deleteProduct = async (productId: string) => {
  try {
    const productRef = doc(db, "products", productId);
    await deleteDoc(productRef);
    alert("상품이 삭제 되었습니다.");
  } catch (error) {
    console.error("Error deleting event: ", error);
  }
};

// 상품 가져오기 - 무한 스크롤로 변경
export const getProducts = async (
  pageParam: QueryDocumentSnapshot<DocumentData> | null,
  selectedType?: Series | Category,
  limitNumber: number = 8
): Promise<ProductsResponse> => {
  const productRef = collection(db, "products");
  const isCategory = (selectedType as string) in CATEGORIES;

  const baseQuery =
    selectedType && isCategory
      ? query(
          productRef,
          where("category", "==", selectedType),
          orderBy("createdAt", "desc")
        )
      : selectedType && !isCategory
      ? query(
          productRef,
          where("series", "==", selectedType),
          orderBy("createdAt", "desc")
        )
      : query(productRef, orderBy("createdAt", "desc"));

  const completeQuery = pageParam
    ? query(baseQuery, startAfter(pageParam), limit(limitNumber))
    : query(baseQuery, limit(limitNumber));

  const querySnapshot = await getDocs(completeQuery);

  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as ProductInfo),
  }));

  return { products, nextPage: lastVisible };
};

// wishProduct 추가
export const toggleWishProduct = async (userId: string, productId: string) => {
  const userWishesRef = collection(db, "userWishes");
  const wishRef = doc(userWishesRef, `${userId}_${productId}`);
  const productRef = doc(db, "products", productId);

  // 트랜잭션을 사용하여 위시리스트 추가/삭제
  await runTransaction(db, async (transaction) => {
    const Wishesnap = await transaction.get(wishRef);
    const productSnap = await transaction.get(productRef);

    if (!productSnap.exists()) {
      throw new Error("product does not exist!");
    }

    if (Wishesnap.exists()) {
      transaction.delete(wishRef);
      alert("위시리스트에서 삭제 되었습니다.");
    } else {
      transaction.set(wishRef, {
        userId,
        productId,
        wishedAt: new Date(),
      });
      alert("위시리스트에 추가 되었습니다.");
    }
  });
};

// 위시 상태 가져오기
export const getIsWishes = async (userId: string): Promise<WishProduct[]> => {
  const q = query(collection(db, "userWishes"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as WishProduct);
};

/**
 * 사용자가 좋아요한 상품 목록을 무한스크롤로 가져옵니다.
 * @param {QueryDocumentSnapshot<DocumentData> | null} pageParam - 무한 스크롤 처리를 위한 페이지 파라미터입니다.
 * @param {string} userId - 사용자 ID입니다.
 * @returns {Promise<ProductsResponse>} - 검색된 상품 목록과 다음 커서 위치를 반환합니다.
 */
export const getUserWishes = async (
  pageParam: QueryDocumentSnapshot<DocumentData> | null,
  userId: string
) => {
  const userWishesRef = collection(db, "userWishes");
  let q = query(
    userWishesRef,
    where("userId", "==", userId),
    orderBy("wishedAt", "desc"),
    limit(10)
  );

  if (pageParam) {
    q = query(q, startAfter(pageParam));
  }

  const snapshot = await getDocs(q);
  const lastVisible = snapshot.docs[snapshot.docs.length - 1];

  const productIds = snapshot.docs.map((doc) => doc.data().productId);
  const products = await Promise.all(
    productIds.map(async (productId) => {
      const productRef = doc(db, "products", productId);
      const productSnap = await getDoc(productRef);
      return { isChecked: false, ...(productSnap.data() as UserActionProduct) };
    })
  );

  return {
    products: products,
    nextPage: lastVisible,
  };
};
