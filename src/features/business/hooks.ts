import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBusinesses, updateBranchStatus, deleteBusiness } from "./api";
import type {
  UpdateBranchStatusDto,
  BusinessModel,
  PaginatedResponse,
} from "./types";

export const useBusinesses = (page = 1, limit = 20) => {
  return useQuery({
    queryKey: ["businesses", page, limit],
    queryFn: () => getBusinesses(page, limit),
    staleTime: 30000, // 30s
    gcTime: 5 * 60 * 1000, // 5 min (formerly cacheTime)
  });
};

export const useUpdateBranchStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      businessId,
      data,
    }: {
      businessId: string;
      data: UpdateBranchStatusDto;
    }) => updateBranchStatus(businessId, data),
    onMutate: async ({ businessId, data }) => {
      await queryClient.cancelQueries({ queryKey: ["businesses"] });

      // Get all business queries (for any page/limit)
      const queries = queryClient.getQueriesData<PaginatedResponse<BusinessModel>>({
        queryKey: ["businesses"],
      });

      const previousDataMap = new Map();

      queries.forEach(([queryKey, oldData]) => {
        if (oldData) {
          previousDataMap.set(queryKey, oldData);
          queryClient.setQueryData(queryKey, {
            ...oldData,
            data: oldData.data.map((business) => {
              if (business.id === businessId) {
                return {
                  ...business,
                  branches: business.branches.map((branch) =>
                    branch.id === data.branchId
                      ? { ...branch, status: data.status }
                      : branch
                  ),
                };
              }
              return business;
            }),
          });
        }
      });

      return { previousDataMap };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
    },
    onError: (_error, _variables, context) => {
      // Rollback all affected queries
      context?.previousDataMap.forEach((oldData, queryKey) => {
        queryClient.setQueryData(queryKey, oldData);
      });
      console.error("Failed to update branch status:", _error);
    },
  });
};

export const useDeleteBusiness = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteBusiness(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["businesses"] });
      
      const queries = queryClient.getQueriesData<PaginatedResponse<BusinessModel>>({
        queryKey: ["businesses"],
      });

      const previousDataMap = new Map();

      queries.forEach(([queryKey, oldData]) => {
        if (oldData) {
          previousDataMap.set(queryKey, oldData);
          queryClient.setQueryData(queryKey, {
            ...oldData,
            data: oldData.data.filter((business) => business.id !== id),
            pagination: {
              ...oldData.pagination,
              totalItems: Math.max(0, oldData.pagination.totalItems - 1),
            },
          });
        }
      });

      return { previousDataMap };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
    },
    onError: (_error, _id, context) => {
      context?.previousDataMap.forEach((oldData, queryKey) => {
        queryClient.setQueryData(queryKey, oldData);
      });
      console.error("Failed to delete business:", _error);
    },
  });
};
