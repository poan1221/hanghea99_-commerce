import { auth, db } from "@/firebase";
import { ISignUpForm, ILoginForm } from "@/types/user";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "./useNavigate";

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
          password: userData.password,
          nickname: userData.nickname,
          userType: userData.userType,
          employeeCode: userData.employeeCode,
          uid: user.uid,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { merge: true }
      );
      // 여기부터 왜 안타는지 확인 필요
      console.log(11111);

      moveLogin();
    } catch (error) {
      console.error("signup error:", error);
    }
  };

  return signUp;
};

export const useLogin = () => {
  const { moveHome } = useNavigate();
  // const setUser = useUserStore((state) => state.setUser);

  const login = async (data: { email: string; password: string }) => {
    const { email, password } = data;

    try {
      const loginInfo = await signInWithEmailAndPassword(auth, email, password);
      const docRef = doc(db, "user", loginInfo.user.uid);
      const docSnap = await getDoc(docRef);
      //   setUser(docSnap.data() as UserType);

      moveHome();
    } catch (error) {
      console.error(error);
    }
  };

  return login;
};
