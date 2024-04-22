import { auth, db } from "@/firebase";
import { ISignUpForm, ILoginForm } from "@/types/user";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "./useNavigate";
import { useUserStore } from "@/store/useUserStore";
import { IUserInfo } from "@/types/user";

export const useSignUp = () => {
  const { moveLogin } = useNavigate();

  const signUp = async (userData: ISignUpForm) => {
    console.log(`signUp -- useSignUp`, userData);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const user = userCredential.user;

      const userRef = doc(db, "user", user.uid);
      await setDoc(
        userRef,
        {
          email: userData.email,
          nickname: userData.nickname,
          userType: userData.userType,
          employeeCode: userData.employeeCode,
          uid: user.uid,
        },
        { merge: true }
      );

      moveLogin();
    } catch (error) {
      console.error("signup error:", error);
    }
  };

  return signUp;
};

export const useLogin = () => {
  const { moveHome } = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const login = async (userData: ILoginForm) => {
    try {
      const loginInfo = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      const docRef = doc(db, "user", loginInfo.user.uid);
      const docSnap = await getDoc(docRef);

      setUser(docSnap.data() as IUserInfo);

      moveHome();
    } catch (error) {
      console.error(error);
    }
  };

  return login;
};
