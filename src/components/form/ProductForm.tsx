import { useForm } from "react-hook-form";
import {
  ProductFormTypes,
  CATEGORIES,
  SERIES,
  ProductInfo,
  FormInputProps,
  SelectFormProps,
} from "@/types/product";
import { productFormInputs, productFormSchema } from "./form.constant";
import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/store/useUserStore";
import { transformdataToFormValues } from "@/utils/transformToFormValues";
import { useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ImageInput } from "./inputs/ImageInput";
import { useNavigate } from "@/hooks/useNavigate";
import { SelectForm } from "./inputs/SelectForm";
import { TextareaForm } from "./inputs/TextareaForm";
import { NumberInput } from "./inputs/NumberInput";
import { TextInput } from "./inputs/TextInput";

interface ProductFormProps {
  productFormHandle: (data: ProductFormTypes) => Promise<any>;
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

  const form = useForm<ProductFormTypes>({
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

  const inputComponentMap: { [key: string]: React.ComponentType<any> } = {
    number: NumberInput as React.ComponentType<FormInputProps>,
    text: TextInput as React.ComponentType<FormInputProps>,
    select: SelectForm as React.ComponentType<SelectFormProps>,
    textarea: TextareaForm as React.ComponentType<FormInputProps>,
  };

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
    mutationFn: (newEventData: ProductFormTypes) =>
      productFormHandle(newEventData),
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

  const onSubmit = form.handleSubmit((data: ProductFormTypes) => {
    const baseData: ProductFormTypes = {
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

        {productFormInputs.map((input) => {
          const InputComponent = inputComponentMap[input.type];
          if (!InputComponent) return null;

          if (input.type === "select") {
            return (
              <InputComponent
                key={input.id}
                input={input}
                options={renderOption(input.id)}
                form={form}
              />
            );
          } else {
            return <InputComponent key={input.id} input={input} form={form} />;
          }
        })}

        <div className="pt-6">
          <Button type="submit" className="w-full">
            {initialData ? "상품 수정하기" : "상품 등록하기"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
