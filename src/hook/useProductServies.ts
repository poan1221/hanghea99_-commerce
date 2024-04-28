import { FirebaseError } from "firebase/app";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { db, storage } from "@/firebase";
import { IProductForm, IProductInfo } from "@/types/product";

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

export const getMyProducts = async (
  sellerId: string
): Promise<IProductInfo[]> => {
  const productRef = collection(db, "products");

  const q = query(
    productRef,
    // 여기 왜 안되용?
    // where("sellerId", "==", sellerId),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);

  const myProducts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as IProductInfo),
  }));

  return myProducts;
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
