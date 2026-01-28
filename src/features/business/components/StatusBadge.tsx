import { Chip, alpha, useTheme } from "@mui/material";

interface StatusBadgeProps {
  status: "Approved" | "Pending" | "Rejected";
  label?: string;
}

type StatusColor =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "primary"
  | "secondary";

const getStatusBadgeStyles = (
  status: string
): { color: StatusColor; label: string } => {
  const statusMap: Record<string, { color: StatusColor; label: string }> = {
    Approved: { color: "success", label: "APPROVED" },
    Pending: { color: "warning", label: "PENDING" },
    Rejected: { color: "error", label: "REJECTED" },
  };
  return statusMap[status] || { color: "info", label: status.toUpperCase() };
};

export const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  const theme = useTheme();
  const { color, label: defaultLabel } = getStatusBadgeStyles(status);
  const displayLabel = label || defaultLabel;

  return (
    <Chip
      label={displayLabel}
      size="small"
      sx={{
        fontWeight: 900,
        borderRadius: 1.5,
        fontSize: "0.65rem",
        letterSpacing: "0.05em",
        background: theme.gradients[color],
        color: "white",
        boxShadow: `0 4px 10px ${alpha(theme.palette[color].main, 0.3)}`,
      }}
    />
  );
};
