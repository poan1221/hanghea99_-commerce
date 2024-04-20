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
  employeeCode: string;
}
