import { useForm } from "react-hook-form";
import {
  IProductForm,
  CATEGORIES,
  SERIES,
  IProductInfo,
} from "@/types/product";
import { productFormInputs, productFormSchema } from "./form.constant";
import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/useUserStore";
import { transformdataToFormValues } from "@/utils/transformToFormValues";
import { useEffect, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ImageInput from "./ImageInput";

interface ProductFormProps {
  addProduct: (data: IProductForm) => Promise<void>;
  initialData?: IProductInfo | null;
}

export const ProductForm = ({ addProduct, initialData }: ProductFormProps) => {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const form = useForm<IProductForm>({
    resolver: zodResolver(productFormSchema),
    mode: "onChange",
    defaultValues: {
      image: null,
      name: "",
      description: "",
      price: 0,
      category: "Accessories",
      series: "WaitForYou",
      quantity: 0,
    },
  });

  // initialData가 변경될 때 폼을 업데이트
  useEffect(() => {
    if (initialData) {
      const formValues = transformdataToFormValues(initialData);
      form.reset(formValues);
      //   setThumbnailPreview(initialData.image as string);
    }
  }, [initialData, form]);

  //  확인용
  const [name, description, price, category, series, quantity] =
    productFormInputs.map((input) => form.watch(input.id));
  const allWrite =
    !name || !description || !price || !category || !series || !quantity;

  const onSubmit = form.handleSubmit((data) => {
    addProduct(data);
  });

  const renderOption = (id: string) => {
    switch (id) {
      case "category":
        return CATEGORIES;
      case "series":
        return SERIES;
      default:
        return {};
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4 text-left ">
        <ImageInput
          form={form}
          thumbnailPreview={thumbnailPreview}
          setThumbnailPreview={setThumbnailPreview}
        />
        {productFormInputs.map((input) => (
          <FormField
            key={input.id}
            name={input.id}
            render={() => (
              <FormItem>
                <FormLabel className="font-bold text-base">
                  {input.label}
                </FormLabel>
                <FormControl>
                  {input.type === "select" ? (
                    <Select {...form.register(input.id)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={input.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Object.entries(renderOption(input.id)).map(
                            ([key, label]) => (
                              <SelectItem key={key} value={key}>
                                {label}
                              </SelectItem>
                            )
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : input.type === "number" ? (
                    <Input type={input.type} {...form.register(input.id)} />
                  ) : (
                    <Input
                      type={input.type}
                      placeholder={input.placeholder}
                      {...form.register(input.id, {
                        setValueAs: (value) => value.trim(),
                      })}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <div className="pt-6">
          <Button type="submit" className="w-full" disabled={allWrite}>
            상품 등록하기
          </Button>
        </div>
      </form>
    </Form>
  );
};
