import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBusinesses,
  updateBranchStatus,
  deleteBusiness,
  deleteBranch,
} from "./api";
import type {
  UpdateBranchStatusDto,
  BusinessModel,
  PaginatedResponse,
} from "./types";
import { BUSINESS_LIST } from "@/shared/constants/appConstants";

export const useBusinesses = (
  page = 1,
  limit: number = BUSINESS_LIST.PAGE_LIMIT
) => {
  return useQuery({
    queryKey: ["businesses", page, limit],
    queryFn: () => getBusinesses(page, limit),
    staleTime: BUSINESS_LIST.STALE_TIME,
    gcTime: BUSINESS_LIST.GC_TIME,
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

    // CTO LEVEL: Immediate Live UI Update with Optimistic Updates
    onMutate: async ({ businessId, data }) => {
      // Cancel outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ["businesses"] });

      // Snapshot the previous values
      const queries = queryClient.getQueriesData<
        PaginatedResponse<BusinessModel>
      >({
        queryKey: ["businesses"],
      });

      const previousDataMap = new Map();

      // Optimistically update every business query in the cache
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

    // On success, immediately invalidate and refetch to ensure server sync
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
    },

    // On error, rollback to the previous state
    onError: (_error, _variables, context) => {
      if (context?.previousDataMap) {
        context.previousDataMap.forEach((oldData, queryKey) => {
          queryClient.setQueryData(queryKey, oldData);
        });
      }
      console.error("Status update failed, rolling back:", _error);
    },
  });
};

export const useDeleteBusiness = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteBusiness(id),

    // Optimistic update: immediately remove from UI
    onMutate: async (id) => {
      // Cancel outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ["businesses"] });

      // Snapshot the previous values for all business queries
      const queries = queryClient.getQueriesData<
        PaginatedResponse<BusinessModel>
      >({
        queryKey: ["businesses"],
      });

      const previousDataMap = new Map();

      // Optimistically remove business from all cached queries
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

    // On success, refetch to ensure server sync
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
    },

    // On error, rollback to the previous state
    onError: (_error, _id, context) => {
      if (context?.previousDataMap) {
        context.previousDataMap.forEach((oldData, queryKey) => {
          queryClient.setQueryData(queryKey, oldData);
        });
      }
      console.error("Failed to delete business:", _error);
    },
  });
};

export const useDeleteBranch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteBranch(id),

    // Optimistic update: immediately remove branch from UI
    onMutate: async (id) => {
      // Cancel outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ["businesses"] });

      // Snapshot the previous values for all business queries
      const queries = queryClient.getQueriesData<
        PaginatedResponse<BusinessModel>
      >({
        queryKey: ["businesses"],
      });

      const previousDataMap = new Map();

      // Optimistically mark branch as deleted in all cached queries
      queries.forEach(([queryKey, oldData]) => {
        if (oldData) {
          previousDataMap.set(queryKey, oldData);
          queryClient.setQueryData(queryKey, {
            ...oldData,
            data: oldData.data.map((business) => ({
              ...business,
              branches: business.branches.map((branch) =>
                branch.id === id
                  ? { ...branch, deletedAt: new Date().toISOString() }
                  : branch
              ),
            })),
          });
        }
      });

      return { previousDataMap };
    },

    // On success, refetch to ensure server sync
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
    },

    // On error, rollback to the previous state
    onError: (_error, _id, context) => {
      if (context?.previousDataMap) {
        context.previousDataMap.forEach((oldData, queryKey) => {
          queryClient.setQueryData(queryKey, oldData);
        });
      }
      console.error("Failed to delete branch:", _error);
    },
  });
};
