import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { ProductFormTypes } from "@/types/product";
import transformImage from "@/utils/transformImage";
import { Icon } from "@/components/common/randerIcon";

interface ImageInputProps {
  imagePreview: string | null;
  setImagePreview: Dispatch<SetStateAction<string | null>>;
  form: UseFormReturn<ProductFormTypes>;
}

export const ImageInput = ({
  imagePreview,
  setImagePreview,
  form,
}: ImageInputProps) => {
  const handleimageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const webpImageBlob = await transformImage(file);

      // Blob을 File 객체로 변환
      const webpImageFile = new File([webpImageBlob], `${file.name}.webp`, {
        type: "image/webp",
        lastModified: new Date().getTime(),
      });

      // 이미지 미리보기 설정
      form.setValue("image", webpImageFile, { shouldValidate: true });
      const imageUrl = URL.createObjectURL(webpImageFile);
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="inline-flex flex-col items-center space-y-2">
      <div className="flex h-[110px] w-[110px] items-center justify-center overflow-hidden rounded-md border border-input">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="image Preview"
            className="size-full object-cover"
          />
        ) : (
          <Icon type="img" />
        )}
      </div>
      <label
        htmlFor="picture"
        className="h-fit cursor-pointer whitespace-nowrap rounded-md bg-secondary px-4 py-2 text-xs font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        {imagePreview ? "이미지 변경" : "이미지 추가 +"}
      </label>
      <FormField
        name="image"
        render={() => (
          <FormItem>
            <FormControl>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                className="hidden"
                {...form.register("image")}
                onChange={handleimageChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
