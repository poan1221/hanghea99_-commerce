import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
// import { MdOutlineFileUpload } from "react-icons/md";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { IProductForm } from "@/types/product";
import transformImage from "@/utils/transformImage";

interface ImageInputProps {
  imagePreview: string | null;
  setImagePreview: Dispatch<SetStateAction<string | null>>;
  form: UseFormReturn<IProductForm>;
}

function ImageInput({ imagePreview, setImagePreview, form }: ImageInputProps) {
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
            className="size-full h-full w-full object-cover"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        )}
      </div>
      <label
        htmlFor="picture"
        className="h-fit cursor-pointer whitespace-nowrap rounded-md bg-secondary px-4 py-2 text-xs font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        {/* <MdOutlineFileUpload /> */}
        이미지 추가 +
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
}

export default ImageInput;
