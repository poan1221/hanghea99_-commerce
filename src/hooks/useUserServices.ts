import { auth, db } from "@/firebase";
import { SignUpFormTypes, LoginFormTypes } from "@/types/user";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "./useNavigate";
import { useUserStore } from "@/store/useUserStore";
import { UserInfo } from "@/types/user";
import { useEffect } from "react";

export const useSignUp = () => {
  const { moveLogin } = useNavigate();

  const signUp = async (userData: SignUpFormTypes) => {
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

  const login = async (userData: LoginFormTypes) => {
    try {
      const loginInfo = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      moveHome();
      return { data: loginInfo };
    } catch (error) {
      console.error(error);
    }
  };

  return login;
};

export const AuthStateObserver = () => {
  const { setUser } = useUserStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // 사용자가 로그인한 상태
        user
          .getIdToken()
          .then(async () => {
            const docRef = doc(db, "user", user.uid);
            const docSnap = await getDoc(docRef);

            setUser(docSnap.data() as UserInfo);
          })
          .catch((error) => {
            console.error("Token renewal error:", error);
            setUser(null);
          });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  return null;
};
