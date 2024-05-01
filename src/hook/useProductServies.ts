import { FirebaseError } from "firebase/app";
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
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { db, storage } from "@/firebase";
import {
  Category,
  IProductForm,
  IProductInfo,
  ProductsResponse,
  Series,
} from "@/types/product";

export const UseAddProduct = () => {
  const addProduct = async (userData: IProductForm) => {
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
  const editProduct = async (data: IProductForm) => {
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
        uid: productId,
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
    return { success: true };
  } catch (error) {
    console.error("Error deleting event: ", error);
    if (error instanceof FirebaseError) {
      return {
        success: false,
        error: error.message,
      };
    } else {
      return {
        success: false,
        error: error,
      };
    }
  }
};

// 상품 가져오기 - 무한 스크롤로 변경
export const getProducts = async (
  pageParam: QueryDocumentSnapshot<DocumentData> | null,
  category?: Category,
  series?: Series
): Promise<ProductsResponse> => {
  const productRef = collection(db, "products");

  // switch문으로 category, series에 따라 쿼리 변경?
  const baseQuery = category
    ? query(
        productRef,
        where("category", "==", category),
        orderBy("createdAt", "desc")
      )
    : series
    ? query(
        productRef,
        where("series", "==", series),
        orderBy("createdAt", "desc")
      )
    : query(productRef, orderBy("createdAt", "desc"));

  const completeQuery = pageParam
    ? query(baseQuery, startAfter(pageParam), limit(2))
    : query(baseQuery, limit(2));

  const querySnapshot = await getDocs(completeQuery);
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as IProductInfo),
  }));
  // console.log("Last Visible Document:", lastVisible);
  // console.log("querySnapshot", querySnapshot);
  return { products, nextPage: lastVisible };
};
