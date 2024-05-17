import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormInputProps } from "@/types/product";

export const TextInput = ({ input, form }: FormInputProps) => {
  return (
    <FormField
      key={input.id}
      control={form.control}
      name={input.id}
      render={() => (
        <FormItem className="w-2/3 min-w-40">
          <FormLabel className="font-bold text-base">{input.label}</FormLabel>
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
  );
};
