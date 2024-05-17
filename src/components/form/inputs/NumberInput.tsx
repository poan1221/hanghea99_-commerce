import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormInputProps } from "@/types/product";

export const NumberInput = ({ input, form }: FormInputProps) => {
  return (
    <FormField
      key={input.id}
      control={form.control}
      name={input.id}
      render={() => (
        <FormItem className="w-1/4 min-w-40">
          <FormLabel className="font-bold text-base">{input.label}</FormLabel>
          <FormControl>
            <Input type={input.type} {...form.register(input.id)} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
