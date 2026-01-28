import { adminApi } from "@/api/client";
import type {
  BusinessModel,
  UpdateBranchStatusDto,
  BranchStatus,
} from "./types";

export const getBusinesses = async (
  branchStatus?: BranchStatus
): Promise<BusinessModel[]> => {
  const response = await adminApi.get<BusinessModel[]>("/admin/businesses", {
    params: { branchStatus },
  });
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
