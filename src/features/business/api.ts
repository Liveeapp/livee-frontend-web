import { adminApi } from "@/api/client";
import type {
  PaginatedResponse,
  BusinessModel,
  UpdateBranchStatusDto,
} from "./types";

export const getBusinesses = async (
  page = 1,
  limit = 20
): Promise<PaginatedResponse<BusinessModel>> => {
  const response = await adminApi.get<PaginatedResponse<BusinessModel>>(
    "/admin/businesses",
    {
      params: { page, limit },
    }
  );
  return response.data;
};

export const updateBranchStatus = async (
  businessId: string,
  data: UpdateBranchStatusDto
): Promise<void> => {
  await adminApi.patch(`/admin/businesses/${businessId}/status`, data);
};

export const deleteBusiness = async (id: string): Promise<void> => {
  await adminApi.delete(`/admin/businesses/${id}`);
};

export const deleteBranch = async (id: string): Promise<void> => {
  await adminApi.delete(`/admin/branches/${id}`);
};
