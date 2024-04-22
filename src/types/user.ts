export interface ILoginForm {
  email: string;
  password: string;
}

export interface ISignUpForm {
  userType: "customer" | "seller";
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
  employeeCode?: string;
}

export interface IUserInfo {
  email: string;
  nickname: string;
  userType: "customer" | "seller";
  employeeCode?: string;
  uid: string;
}
