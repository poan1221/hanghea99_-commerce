import { useForm } from "react-hook-form";
import { ProductForm, CATEGORIES, SERIES, ProductInfo } from "@/types/product";
import { productFormInputs, productFormSchema } from "./form.constant";
import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient, useMutation } from "@tanstack/react-query";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImageInput from "./inputs/ImageInput";
import { useNavigate } from "@/hooks/useNavigate";

interface ProductFormProps {
  productFormHandle: (data: ProductForm) => Promise<any>;
  initialData?: ProductInfo | null;
}

export const ProductForm = ({
  productFormHandle,
  initialData,
}: ProductFormProps) => {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  const { moveMyList } = useNavigate();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<ProductForm>({
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
      setImagePreview(initialData.image as string);
    }
  }, [initialData, form]);

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

  const productMutation = useMutation({
    mutationFn: (newEventData: ProductForm) => productFormHandle(newEventData),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["products", user?.uid] });
        moveMyList();
      } else {
        console.error(result.error);
      }
    },
    onError: (error) => {
      console.error("오류가 발생하였습니다.:", error);
    },
  });

  const onSubmit = form.handleSubmit((data: ProductForm) => {
    const baseData: ProductForm = {
      ...data,
      sellerId: user?.uid as string,
    };

    if (initialData) {
      productMutation.mutate({ ...baseData, uid: initialData.id });
    } else {
      productMutation.mutate(baseData);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4 text-left">
        <ImageInput
          form={form}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
        />

        {productFormInputs
          .filter((input) => input.type === "number" || input.type === "text")
          .map((input) => (
            <FormField
              key={input.id}
              control={form.control}
              name={input.id}
              render={() => (
                <FormItem>
                  <FormLabel className="font-bold text-base">
                    {input.label}
                  </FormLabel>
                  <FormControl>
                    {input.type === "number" ? (
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

        {productFormInputs
          .filter(
            (input) => input.type === "select" || input.type === "textarea"
          )
          .map((input) => (
            <FormField
              control={form.control}
              name={input.id}
              key={input.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-base">
                    {input.label}
                  </FormLabel>
                  {input.type === "select" ? (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value as string}
                      value={field.value as string}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="필수 선택사항입니다." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(renderOption(input.id)).map(
                          ([key, label]) => (
                            <SelectItem key={key} value={key}>
                              {label}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  ) : (
                    <FormControl>
                      <Textarea
                        placeholder="상품의 상세 정보를 작성해주세요."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

        <div className="pt-6">
          <Button type="submit" className="w-full">
            {initialData ? "상품 수정하기" : "상품 등록하기"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
