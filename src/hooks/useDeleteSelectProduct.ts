import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

interface IUseDeleteSelectProduct {
  mutationFn: (productUid: string) => Promise<void>;
  queryKey: QueryKey;
}

export const useDeleteSelectProduct = (props: IUseDeleteSelectProduct) => {
  const { mutationFn, queryKey } = props;
  const queryClient = useQueryClient();

  const deleteListMutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
    onError: (error) => {
      console.error("오류가 발생하였습니다.:", error);
    },
  });

  return deleteListMutation;
};
