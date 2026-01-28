export type BranchStatus = "Pending" | "Approved" | "Rejected";
export type BusinessType =
  | "restaurant"
  | "bar"
  | "coffee_shop"
  | "bakery"
  | string;

export interface BusinessLocation {
  id: string;
  addressDescription: string;
}

export interface BusinessHours {
  id: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  openTime: string; // HH:mm format
  closeTime: string; // HH:mm format
}

export interface BranchModel {
  id: string;
  branchName: string;
  status: BranchStatus;
  isNewBranch: boolean;
  createdAt: string;
  location: BusinessLocation | null;
  businessHours: BusinessHours[];
  deletedAt?: string | null;
}

export interface BusinessOwner {
  id: string;
  email: string;
}

export interface BusinessModel {
  id: string;
  name: string;
  businessType: BusinessType | null;
  businessImageUrl: string | null;
  createdAt: string | null;
  user: BusinessOwner;
  branches: BranchModel[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface UpdateBranchStatusDto {
  status: BranchStatus;
  branchId?: string;
}
