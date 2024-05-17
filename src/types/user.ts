export interface LoginFormTypes {
  email: string;
  password: string;
}

export interface SignUpFormTypes {
  userType: "customer" | "seller";
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
  employeeCode?: string;
}

export interface UserInfo {
  email: string;
  nickname: string;
  userType: "customer" | "seller";
  employeeCode?: string;
  uid: string;
}
