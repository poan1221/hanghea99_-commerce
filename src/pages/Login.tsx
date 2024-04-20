import { useForm } from "react-hook-form";
import { useNavigate } from "../hook/useNavigate";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface IForm {
  email: string;
  password: string;
}

export const Login = () => {
  const { moveSignup } = useNavigate();

  const form = useForm<IForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const email = form.watch("email");
  const password = form.watch("password");
  const allWrite = !email || !password;

  function onSubmit(values: IForm) {
    // 로그인 기능 추가 _ firebase 사용
  }

  return (
    <section className="max-w-lg section-py mx-auto">
      <h2 className="text-slate-900 font-bold text-[40px] pb-10">LOGIN</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={allWrite}>
            로그인
          </Button>
          <div
            className="text-right cursor-pointer"
            onClick={() => moveSignup()}
          >
            아직 회원이 아니신가요?
          </div>
        </form>
      </Form>
    </section>
  );
};
