import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FormInputProps } from "@/types/product";

export const TextareaForm = ({ input, form }: FormInputProps) => {
  return (
    <FormField
      control={form.control}
      name={input.id}
      key={input.id}
      render={({ field }) => {
        const { value, ...rest } = field;

        return (
          <FormItem>
            <FormLabel className="font-bold text-base">{input.label}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={input.placeholder}
                className="resize-none"
                value={field.value as string}
                {...rest}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
