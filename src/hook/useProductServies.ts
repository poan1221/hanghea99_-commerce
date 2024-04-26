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
  // const { moveLogin } = useNavigate();

  const addProduct = async (userData: IProductForm) => {
    // firestore에 product 추가
    const productId = doc(collection(db, "product")).id;

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
      return { success: true, productId };
    } catch (error) {
      return { success: false, error: error };
    }
  };

  return addProduct;
};
