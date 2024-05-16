import { ProductForm } from "@/types/product";
import { SignUpForm } from "@/types/user";
import { z } from "zod";

export interface SignUpInputProps {
  id: keyof SignUpForm;
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

////// product //////
export interface productFormInputProps {
  id: keyof ProductForm;
  label: string;
  type: string;
  placeholder?: string;
}

export const productFormInputs: productFormInputProps[] = [
  {
    id: "name",
    label: "상품명",
    type: "text",
    placeholder: "상품명을 기입해 주세요.",
  },
  {
    id: "category",
    label: "카테고리",
    type: "select",
    placeholder: "카테고리를 선택해 주세요.",
  },
  {
    id: "series",
    label: "시리즈",
    type: "select",
    placeholder: "시리즈를 선택해 주세요.",
  },
  {
    id: "price",
    label: "가격",
    type: "number",
  },
  {
    id: "quantity",
    label: "수량",
    type: "number",
  },
  {
    id: "description",
    label: "상세 내용",
    type: "textarea",
    placeholder: "상품의 상세 정보를 작성해주세요.",
  },
];

export const productFormSchema = z.object({
  image: z.union([z.instanceof(Blob), z.string()]).refine((val) => val !== "", {
    message: "썸네일은 필수입니다.",
  }),
  name: z.string().min(1, "상품명은 필수입니다.").trim(),
  category: z.string(),
  series: z.string(),
  description: z.string().min(1, "상세 내용은 필수입니다."),
  price: z.coerce.number().int().positive("가격은 0보다 커야 합니다."),
  quantity: z.coerce.number().int().positive("수량은 0보다 커야 합니다."),
});
