import { adminApi } from '@/api/client';

export const deleteBranch = async (id: string): Promise<void> => {
  await adminApi.delete(`/admin/branches/${id}`);
};
