import { useForm } from "react-hook-form";
import { ILoginForm } from "@/types/user";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserCredential } from "@firebase/auth";

interface LoginFormProps {
  login: (data: ILoginForm) => Promise<{ data: UserCredential } | undefined>;
}

export const LoginForm = ({ login }: LoginFormProps) => {
  const form = useForm<ILoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const email = form.watch("email");
  const password = form.watch("password");
  const allWrite = !email || !password;

  const onSubmit = form.handleSubmit((data) => {
    login(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
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
        <div className="pt-6">
          <Button type="submit" className="w-full" disabled={allWrite}>
            로그인
          </Button>
        </div>
      </form>
    </Form>
  );
};
