import { ISignUpForm } from "@/types/user";
import { z } from "zod";

export interface SignUpInputProps {
  id: keyof ISignUpForm;
  type: string;
  placeholder: string;
}

export const signUpInputs: SignUpInputProps[] = [
  {
    id: "nickname",
    type: "text",
    placeholder: "name",
  },
  {
    id: "email",
    type: "email",
    placeholder: "email",
  },
  {
    id: "password",
    type: "password",
    placeholder: "password",
  },
  {
    id: "passwordConfirm",
    type: "password",
    placeholder: "password confirm",
  },
];

export const SignFormSchema = z
  .object({
    userType: z.enum(["customer", "seller"]),
    email: z.string().email("! 유효하지 않은 이메일 주소입니다."),
    nickname: z.string().min(1, "! 이름을 입력해 주세요."),
    password: z
      .string()
      .min(8, { message: "! 비밀번호는 최소 8자 이상이어야 합니다." })
      .refine(
        (val) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            val
          ) ||
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(val) ||
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z@$!%*?&]{8,}$/.test(
            val
          ) ||
          /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{8,}$/.test(val),
        {
          message:
            "! 비밀번호는 대문자, 소문자, 숫자, 특수문자 중 3종류를 포함해야 합니다.",
        }
      ),
    passwordConfirm: z.string(),
    employeeCode: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "! 비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });
