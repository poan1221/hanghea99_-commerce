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
  thumbnailPreview: string | null;
  setThumbnailPreview: Dispatch<SetStateAction<string | null>>;
  form: UseFormReturn<IProductForm>;
}

function ImageInput({
  thumbnailPreview,
  setThumbnailPreview,
  form,
}: ImageInputProps) {
  const handleThumbnailChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
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
      setThumbnailPreview(imageUrl);
    } else {
      setThumbnailPreview(null);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      {/* <FormLabel className="font-bold text-base"></FormLabel> */}
      {thumbnailPreview ? (
        <div className="flex h-[320px] w-full items-center justify-center overflow-hidden rounded-md border border-input">
          <img
            src={thumbnailPreview}
            alt="Thumbnail Preview"
            className="size-full h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex h-[320px] w-full items-center justify-center overflow-hidden rounded-md border border-input">
          <p className="text-center text-sm text-gray-500">썸네일 미리보기</p>
        </div>
      )}
      <div className="flex justify-end">
        <label
          htmlFor="picture"
          className="inline-flex h-fit cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-xs font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {/* <MdOutlineFileUpload /> */}
          업로드
        </label>
      </div>
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
                onChange={handleThumbnailChange}
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