import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

interface UseDeleteSelectProductProps {
  mutationFn: (productUid: string) => Promise<void>;
  queryKey: QueryKey;
}

export const useDeleteSelectProduct = (props: UseDeleteSelectProductProps) => {
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
