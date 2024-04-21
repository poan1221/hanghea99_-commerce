import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ISignUpForm } from "@/types/user";
// import path from "path";
// import { on } from "events";

interface SignUPFormProps {
  signUp: (data: ISignUpForm) => Promise<void>;
}

export const SignUpForm = ({ signUp }: SignUPFormProps) => {
  const form = useForm<ISignUpForm>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      userType: "customer",
      email: "",
      nickname: "",
      password: "",
      passwordConfirm: "",
      employeeCode: "",
    },
  });

  const userType = form.watch("userType");
  const email = form.watch("email");
  const nickname = form.watch("nickname");
  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");
  const employeeCode = form.watch("employeeCode");
  const allWrite =
    !userType || !email || !nickname || !password || !passwordConfirm;

  const onSubmit = form.handleSubmit((data) => {
    console.log(`버튼 눌렀죠?` + data);
    signUp(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4 text-left">
        <FormField
          control={form.control}
          name="userType"
          render={({ field }) => (
            <FormItem className="flex justify-center">
              <FormControl>
                <Tabs
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="w-full text-center"
                >
                  <TabsList className="mb-6">
                    <TabsTrigger value="customer" className="w-50">
                      Customer
                    </TabsTrigger>
                    <TabsTrigger value="seller">Seller</TabsTrigger>
                  </TabsList>
                  <TabsContent value="seller">
                    <FormField
                      name="employeeCode"
                      render={() => (
                        <FormItem className="text-left">
                          <FormControl>
                            <Input
                              placeholder="employeeCode"
                              {...form.register("employeeCode", {
                                setValueAs: (value) => value.trim(),
                              })}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="nickname"
          render={() => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="name"
                  {...form.register("nickname", {
                    setValueAs: (value) => value.trim(),
                  })}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          render={() => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="email"
                  {...form.register("email", {
                    setValueAs: (value) => value.trim(),
                  })}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          render={() => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="password"
                  {...form.register("password")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="passwordConfirm"
          render={() => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="password confirm"
                  {...form.register("passwordConfirm")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-6">
          <Button
            type="submit"
            className="w-full"
            disabled={
              userType == "customer" ? allWrite : allWrite || !employeeCode
            }
          >
            회원가입
          </Button>
        </div>
      </form>
    </Form>
  );
};

const formSchema = z
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
  })
  .refine(
    (data) =>
      data.userType === "seller" &&
      (!data.employeeCode || data.employeeCode.length === 10),
    {
      message: "! 직원 코드는 10자리 숫자입니다.",
      path: ["employeeCode"],
    }
  );
