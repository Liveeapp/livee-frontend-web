import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBranch } from "./api";
import type {
  PaginatedResponse,
  BusinessModel,
} from "@/features/business/types";

export const useDeleteBranch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteBranch(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["businesses"] });
      const previousData = queryClient.getQueryData<
        PaginatedResponse<BusinessModel>
      >(["businesses"]);

      if (previousData) {
        // Optimistic delete: remove branch from all businesses
        const updatedData = {
          ...previousData,
          data: previousData.data.map((business) => ({
            ...business,
            branches: business.branches.filter((branch) => branch.id !== id),
          })),
        };
        queryClient.setQueryData(["businesses"], updatedData);
      }

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
    },
    onError: (_error, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["businesses"], context.previousData);
      }
      console.error("Failed to delete branch:", _error);
    },
  });
};
