import { useForm } from "react-hook-form";
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
import { SignUpFormTypes } from "@/types/user";
import { signUpInputs, SignFormSchema } from "./form.constant";

interface SignUPFormProps {
  signUp: (data: SignUpFormTypes) => Promise<void>;
}

export const SignUpForm = ({ signUp }: SignUPFormProps) => {
  const form = useForm<SignUpFormTypes>({
    resolver: zodResolver(SignFormSchema),
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

  const [nickname, email, password, passwordConfirm] = signUpInputs
    .filter((input) => input.id !== "userType" && input.id !== "employeeCode")
    .map((input) => form.watch(input.id));
  const userType = form.watch("userType");
  const employeeCode = form.watch("employeeCode");
  const allWrite =
    !userType || !email || !nickname || !password || !passwordConfirm;

  const onSubmit = form.handleSubmit((data) => {
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
                              placeholder="employee code"
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
        {signUpInputs
          .filter(
            (input) => input.id !== "userType" && input.id !== "employeeCode"
          )
          .map((input) => (
            <FormField
              key={input.id}
              name={input.id}
              render={() => (
                <FormItem>
                  <FormControl>
                    <Input
                      type={input.type}
                      placeholder={input.placeholder}
                      {...form.register(input.id, {
                        setValueAs: (value) => value.trim(),
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
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
