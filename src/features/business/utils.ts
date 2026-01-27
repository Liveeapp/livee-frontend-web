import type { BusinessType, BranchStatus, BusinessHours } from "./types";

/**
 * Business type labels for display
 */
const BUSINESS_TYPE_LABELS: Record<string, string> = {
  restaurant: "Restaurant",
  bar: "Bar",
  coffee_shop: "Coffee Shop",
  bakery: "Bakery",
};

/**
 * Get formatted business type label
 */
export const getBusinessTypeLabel = (type: BusinessType | null): string => {
  if (!type) return "Unknown";
  return BUSINESS_TYPE_LABELS[type] || type.charAt(0).toUpperCase() + type.slice(1);
};

/**
 * Branch status colors for chips
 */
export const getStatusColor = (
  status: BranchStatus
): "default" | "success" | "warning" | "error" | "info" => {
  switch (status) {
    case "Approved":
      return "success";
    case "Pending":
      return "warning";
    case "Rejected":
      return "error";
    default:
      return "default";
  }
};

/**
 * Day of week labels
 */
const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/**
 * Get day name from day of week number
 */
export const getDayName = (dayOfWeek: number): string => {
  return DAYS_OF_WEEK[dayOfWeek] || `Day ${dayOfWeek}`;
};

/**
 * Format business hours for display
 */
export const formatBusinessHours = (hours: BusinessHours[]): string => {
  if (!hours || hours.length === 0) return "No hours set";

  const sortedHours = [...hours].sort((a, b) => a.dayOfWeek - b.dayOfWeek);

  return sortedHours
    .map(
      (h) =>
        `${getDayName(h.dayOfWeek).slice(0, 3)}: ${h.openTime}-${h.closeTime}`
    )
    .join(", ");
};

/**
 * Get branch status badge text (without emoji)
 */
export const getStatusBadge = (status: BranchStatus): string => {
  return status;
};

/**
 * Format date for display
 */
export const formatDate = (dateString: string | null): string => {
  if (!dateString) return "N/A";

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Invalid date";
  }
};

/**
 * Get branch status summary counts
 */
export const getBranchStatusCounts = (
  branches: { status: BranchStatus; deletedAt?: string | null }[] = []
) => {
  if (!branches || !Array.isArray(branches)) {
    return { Approved: 0, Pending: 0, Rejected: 0, Deleted: 0 };
  }
  return {
    Approved: branches.filter((b) => !b.deletedAt && b.status === "Approved")
      .length,
    Pending: branches.filter((b) => !b.deletedAt && b.status === "Pending")
      .length,
    Rejected: branches.filter((b) => !b.deletedAt && b.status === "Rejected")
      .length,
    Deleted: branches.filter((b) => !!b.deletedAt).length,
  };
};

/**
 * Get branch status summary text (legacy support)
 */
export const getBranchStatusSummary = (
  branches: { status: BranchStatus }[] = []
): string => {
  const counts = getBranchStatusCounts(branches);
  const parts: string[] = [];
  if (counts.Approved > 0) parts.push(`${counts.Approved} Approved`);
  if (counts.Pending > 0) parts.push(`${counts.Pending} Pending`);
  if (counts.Rejected > 0) parts.push(`${counts.Rejected} Rejected`);

  return parts.length > 0 ? parts.join(", ") : "No branches";
};
