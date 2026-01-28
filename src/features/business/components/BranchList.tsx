import {
  Box,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  useTheme,
  alpha,
  CircularProgress,
} from "@mui/material";
import {
  DeleteRounded as DeleteIcon,
  CheckCircleRounded as ApproveIcon,
  CancelRounded as RejectIcon,
  LocationOnRounded as LocationIcon,
  StorefrontRounded as StoreIcon,
  ScheduleRounded as PendingIcon,
} from "@mui/icons-material";
import type { BranchModel, UpdateBranchStatusDto } from "../types";
import { StatusBadge, GradientBox, TableHeaderCell } from "./index";
import { formatDate, getRemainingGraceDays, isGracePeriodActive } from "../utils";

interface BranchListProps {
  businessId: string;
  branches: BranchModel[];
  onUpdateStatus: (params: {
    businessId: string;
    data: UpdateBranchStatusDto;
  }) => void;
  onDeleteBranch: (branchId: string) => void;
  isUpdatingStatus?: boolean;
  isDeletingBranch?: boolean;
}

export const BranchList = ({
  businessId,
  branches,
  onUpdateStatus,
  onDeleteBranch,
  isUpdatingStatus,
  isDeletingBranch,
}: BranchListProps) => {
  const theme = useTheme();

  if (branches.length === 0) {
    return (
      <Box sx={{ py: 15, textAlign: "center" }}>
        <StoreIcon
          sx={{ fontSize: 80, color: "text.tertiary", opacity: 0.2, mb: 3 }}
        />
        <Typography
          variant="h5"
          sx={{ color: "text.primary", fontWeight: 800, mb: 1 }}
        >
          No Branch Entities
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontWeight: 500, maxWidth: 400, mx: "auto" }}
        >
          This business has not yet registered any physical locations for
          verification.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableHeaderCell sx={{ py: 3, px: 5 }}>
                Branch Name
              </TableHeaderCell>
              <TableHeaderCell>Audit Status</TableHeaderCell>
              <TableHeaderCell>Verified Address</TableHeaderCell>
              <TableHeaderCell>Registered</TableHeaderCell>
              <TableHeaderCell align="right" sx={{ px: 5 }}>
                Audit Controls
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {branches.map((branch) => (
              <TableRow
                key={branch.id}
                hover
                sx={{ "&:last-child td": { border: 0 } }}
              >
                <TableCell sx={{ py: 3, px: 5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                    <GradientBox
                      gradient="primary"
                      sx={{ p: 1.25, width: "auto", color: "white" }}
                    >
                      <LocationIcon fontSize="small" />
                    </GradientBox>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                        {branch.branchName}
                      </Typography>
                      {branch.deletedAt && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: "error.main",
                            fontWeight: 900,
                            letterSpacing: "0.05em",
                            display: "block",
                          }}
                        >
                          DELETED ON {formatDate(branch.deletedAt)}
                          <Box
                            component="span"
                            sx={{ ml: 1, color: "text.tertiary", opacity: 0.7 }}
                          >
                            ({isGracePeriodActive(branch.deletedAt)
                              ? `${getRemainingGraceDays(
                                  branch.deletedAt
                                )} DAYS REMAINING`
                              : "PERMANENT REMOVAL PENDING"})
                          </Box>
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <StatusBadge
                    status={branch.status}
                    label={
                      branch.deletedAt && isGracePeriodActive(branch.deletedAt)
                        ? "DELETION GRACE"
                        : undefined
                    }
                  />
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 600,
                      maxWidth: 300,
                    }}
                    noWrap
                  >
                    {branch.location?.addressDescription || "N/A"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.tertiary", fontWeight: 700 }}
                  >
                    {formatDate(branch.createdAt)}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ px: 5 }}>
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    {branch.status !== "Approved" && (
                      <IconButton
                        size="small"
                        disabled={
                          isUpdatingStatus ||
                          (!!branch.deletedAt &&
                            !isGracePeriodActive(branch.deletedAt))
                        }
                        onClick={() =>
                          onUpdateStatus({
                            businessId,
                            data: {
                              status: "Approved",
                              branchId: branch.id,
                            },
                          })
                        }
                        sx={{
                          background:
                            branch.deletedAt &&
                            !isGracePeriodActive(branch.deletedAt)
                              ? theme.palette.action.disabledBackground
                              : theme.gradients.success,
                          color: "white",
                          "&:hover": {
                            transform:
                              branch.deletedAt &&
                              !isGracePeriodActive(branch.deletedAt)
                                ? "none"
                                : "translateY(-2px)",
                          },
                        }}
                        title={
                          branch.deletedAt &&
                          !isGracePeriodActive(branch.deletedAt)
                            ? "Cannot approve: Grace period expired"
                            : "Approve this branch"
                        }
                      >
                        <ApproveIcon fontSize="small" />
                      </IconButton>
                    )}
                    {branch.status !== "Rejected" && (
                      <IconButton
                        size="small"
                        disabled={
                          isUpdatingStatus ||
                          (!!branch.deletedAt &&
                            !isGracePeriodActive(branch.deletedAt))
                        }
                        onClick={() =>
                          onUpdateStatus({
                            businessId,
                            data: {
                              status: "Rejected",
                              branchId: branch.id,
                            },
                          })
                        }
                        sx={{
                          background:
                            branch.deletedAt &&
                            !isGracePeriodActive(branch.deletedAt)
                              ? theme.palette.action.disabledBackground
                              : theme.gradients.error,
                          color: "white",
                          "&:hover": {
                            transform:
                              branch.deletedAt &&
                              !isGracePeriodActive(branch.deletedAt)
                                ? "none"
                                : "translateY(-2px)",
                          },
                        }}
                        title={
                          branch.deletedAt &&
                          !isGracePeriodActive(branch.deletedAt)
                            ? "Cannot reject: Grace period expired"
                            : "Reject this branch"
                        }
                      >
                        <RejectIcon fontSize="small" />
                      </IconButton>
                    )}
                    {branch.status !== "Pending" && (
                      <IconButton
                        size="small"
                        disabled={
                          isUpdatingStatus ||
                          (!!branch.deletedAt &&
                            !isGracePeriodActive(branch.deletedAt))
                        }
                        onClick={() =>
                          onUpdateStatus({
                            businessId,
                            data: {
                              status: "Pending",
                              branchId: branch.id,
                            },
                          })
                        }
                        sx={{
                          background:
                            branch.deletedAt &&
                            !isGracePeriodActive(branch.deletedAt)
                              ? theme.palette.action.disabledBackground
                              : theme.gradients.warning,
                          color: "white",
                          "&:hover": {
                            transform:
                              branch.deletedAt &&
                              !isGracePeriodActive(branch.deletedAt)
                                ? "none"
                                : "translateY(-2px)",
                          },
                        }}
                        title={
                          branch.deletedAt &&
                          !isGracePeriodActive(branch.deletedAt)
                            ? "Cannot reset: Grace period expired"
                            : "Mark as Pending"
                        }
                      >
                        <PendingIcon fontSize="small" />
                      </IconButton>
                    )}
                    {!branch.deletedAt && (
                      <IconButton
                        size="small"
                        disabled={isDeletingBranch}
                        onClick={() => {
                          if (confirm("Delete this branch permanently?")) {
                            onDeleteBranch(branch.id);
                          }
                        }}
                        sx={{
                          "&:hover": {
                            color: "error.main",
                            bgcolor: alpha(theme.palette.error.main, 0.1),
                          },
                        }}
                        title="Delete this branch"
                      >
                        {isDeletingBranch ? (
                          <CircularProgress size={16} />
                        ) : (
                          <DeleteIcon fontSize="small" />
                        )}
                      </IconButton>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
