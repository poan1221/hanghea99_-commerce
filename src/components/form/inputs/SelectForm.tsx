import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectFormProps } from "@/types/product";

export const SelectForm = ({ input, options, form }: SelectFormProps) => {
  return (
    <FormField
      control={form.control}
      name={input.id}
      key={input.id}
      render={({ field }) => (
        <FormItem className="w-2/5 min-w-40">
          <FormLabel className="font-bold text-base">{input.label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value as string}
            value={field.value as string}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={input.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.entries(options).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
