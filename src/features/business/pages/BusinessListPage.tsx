import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Paper,
  Dialog,
  DialogContent,
  DialogActions,
  Avatar,
  Stack,
  useTheme,
  alpha,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  type SelectChangeEvent,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import {
  DeleteRounded as DeleteIcon,
  CheckCircleRounded as ApproveIcon,
  CancelRounded as RejectedIcon,
  BusinessRounded as BusinessIcon,
  ScheduleRounded as PendingIcon,
  StorefrontRounded as StoreIcon,
  SearchRounded as SearchIcon,
  WarningRounded as WarningIcon,
} from "@mui/icons-material";
import {
  useBusinesses,
  useUpdateBranchStatus,
  useDeleteBusiness,
  useDeleteBranch,
} from "../hooks";
import type { BusinessModel, BranchStatus } from "../types";
import { getBusinessTypeLabel, getBranchStatusCounts } from "../utils";
import { GradientBox, BranchList } from "../components";
import { AnimatePresence, motion } from "framer-motion";

export const BusinessListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const theme = useTheme();

  const [selectedBusiness, setSelectedBusiness] =
    useState<BusinessModel | null>(null);

  const { data, isLoading } = useBusinesses(
    statusFilter !== "all" && statusFilter !== "no_branches"
      ? (statusFilter.charAt(0).toUpperCase() +
          statusFilter.slice(1)) as BranchStatus
      : undefined
  );
  const { mutate: updateStatus, isPending: isUpdatingStatus } =
    useUpdateBranchStatus();
  const { mutate: deleteBusiness, isPending: isDeletingBusiness } =
    useDeleteBusiness();
  const { mutate: deleteBranch, isPending: isDeletingBranch } =
    useDeleteBranch();

  // Client-side filtering for search
  const filteredRows = useMemo(() => {
    let items = data || [];

    // Search filter
    items = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.user?.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // No Branches filter
    if (statusFilter === "no_branches") {
      items = items.filter((item) => item.branches.length === 0);
    }

    return items;
  }, [data, searchQuery, statusFilter]);

  const columns: GridColDef[] = [
    {
      field: "businessImage",
      headerName: "",
      width: 100,
      sortable: false,
      renderCell: (params: GridRenderCellParams<BusinessModel>) => (
        <Avatar
          src={params.row.businessImageUrl || undefined}
          alt={params.row.name}
          variant="rounded"
          sx={{
            width: 52,
            height: 52,
            bgcolor: "primary.main",
            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
            borderRadius: 2,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "scale(1.1) rotate(4deg)",
              boxShadow: theme.customShadows.md,
            },
          }}
        >
          {params.row.name.charAt(0)}
        </Avatar>
      ),
    },
    {
      field: "name",
      headerName: "Business Name",
      flex: 1.5,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ py: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 800, color: "text.primary", lineHeight: 1.2 }}
          >
            {params.value}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.tertiary",
              fontWeight: 700,
              letterSpacing: "0.02em",
            }}
          >
            ID: {params.row.id.slice(0, 12).toUpperCase()}
          </Typography>
        </Box>
      ),
    },
    {
      field: "businessType",
      headerName: "Category",
      width: 160,
      renderCell: (params: GridRenderCellParams<BusinessModel>) => (
        <Chip
          label={getBusinessTypeLabel(params.row.businessType)}
          size="small"
          sx={{
            borderRadius: 1.5,
            fontWeight: 800,
            textTransform: "uppercase",
            fontSize: "0.65rem",
            letterSpacing: "0.05em",
            bgcolor: "action.hover",
            color: "text.secondary",
            border: "1px solid",
            borderColor: "divider",
          }}
        />
      ),
    },
    {
      field: "user",
      headerName: "Owner Email",
      flex: 1.2,
      minWidth: 220,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, color: "text.secondary" }}
        >
          {params.row.user?.email || "N/A"}
        </Typography>
      ),
    },
    {
      field: "branchStatus",
      headerName: "State Audit",
      flex: 1.5,
      minWidth: 320,
      renderCell: (params: GridRenderCellParams<BusinessModel>) => {
        const counts = getBranchStatusCounts(params.row.branches);
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                p: 0.5,
                bgcolor: "background.default",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              {params.row.branches.length === 0 ? (
                <Tooltip title="No Branches Registered">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      background: theme.gradients.error,
                      px: 1,
                      py: 0.25,
                      borderRadius: 1.25,
                      color: "white",
                      animation: "pulse 2s infinite ease-in-out",
                      "@keyframes pulse": {
                        "0%": { opacity: 1, transform: "scale(1)" },
                        "50%": { opacity: 0.7, transform: "scale(0.95)" },
                        "100%": { opacity: 1, transform: "scale(1)" },
                      },
                    }}
                  >
                    <WarningIcon sx={{ fontSize: 14 }} />
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 900, fontSize: "0.7rem", letterSpacing: '0.05em' }}
                    >
                      NO ENTITIES
                    </Typography>
                  </Box>
                </Tooltip>
              ) : (
                <>
                  {counts.Approved > 0 && (
                    <Tooltip title="Verified Branches">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          background: theme.gradients.success,
                          px: 1,
                          py: 0.25,
                          borderRadius: 1.25,
                          color: "white",
                        }}
                      >
                        <ApproveIcon sx={{ fontSize: 14 }} />
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: 900, fontSize: "0.7rem" }}
                        >
                          {counts.Approved}
                        </Typography>
                      </Box>
                    </Tooltip>
                  )}
                  {counts.Pending > 0 && (
                    <Tooltip title="Pending Verification">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          background: theme.gradients.warning,
                          px: 1,
                          py: 0.25,
                          borderRadius: 1.25,
                          color: "white",
                        }}
                      >
                        <PendingIcon sx={{ fontSize: 14 }} />
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: 900, fontSize: "0.7rem" }}
                        >
                          {counts.Pending}
                        </Typography>
                      </Box>
                    </Tooltip>
                  )}
                  {counts.Rejected > 0 && (
                    <Tooltip title="Rejected Records">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          background: theme.gradients.error,
                          px: 1,
                          py: 0.25,
                          borderRadius: 1.25,
                          color: "white",
                        }}
                      >
                        <RejectedIcon sx={{ fontSize: 14 }} />
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: 900, fontSize: "0.7rem" }}
                        >
                          {counts.Rejected}
                        </Typography>
                      </Box>
                    </Tooltip>
                  )}
                  {counts.Deleted > 0 && (
                    <Tooltip title={`${counts.Deleted} Branches in Deletion Grace Period`}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          bgcolor: alpha(theme.palette.text.tertiary, 0.1),
                          px: 1,
                          py: 0.25,
                          borderRadius: 1.25,
                          color: "text.tertiary",
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: 14, opacity: 0.7 }} />
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: 900, fontSize: "0.6rem", letterSpacing: '0.05em' }}
                        >
                          GRACEFUL: {counts.Deleted}
                        </Typography>
                      </Box>
                    </Tooltip>
                  )}
                </>
              )}
            </Stack>
            {params.row.branches.length > 0 && (
              <Button
                size="small"
                variant="contained"
                onClick={() => setSelectedBusiness(params.row)}
                sx={{
                  py: 0.75,
                  px: 2.5,
                  borderRadius: 2,
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  boxShadow: theme.customShadows.md,
                  background: theme.gradients.primary,
                  color: "white",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    filter: "brightness(1.1)",
                  },
                }}
              >
                Manage
              </Button>
            )}
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "",
      width: 100,
      sortable: false,
      align: "right",
      renderCell: (params: GridRenderCellParams<BusinessModel>) => {
        if (statusFilter === "deleted") return null;
        return (
          <Box sx={{ pr: 2 }}>
            <IconButton
              color="error"
              size="medium"
              disabled={isDeletingBusiness}
              onClick={() => {
                if (
                  confirm(
                    "Delete this business and all associated data permanently?"
                  )
                )
                  deleteBusiness(params.row.id);
              }}
              sx={{
                opacity: 0.6,
                transition: "all 0.2s",
                "&:hover": {
                  opacity: 1,
                  bgcolor: alpha(theme.palette.error.main, 0.12),
                  transform: "scale(1.1)",
                },
              }}
            >
              {isDeletingBusiness ? (
                <CircularProgress size={20} color="error" />
              ) : (
                <DeleteIcon />
              )}
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 6 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
          }}
        >
          <Box>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}
            >
              <GradientBox gradient="secondary" sx={{ p: 0.75, width: "auto" }}>
                <StoreIcon fontSize="small" />
              </GradientBox>
              <Typography
                variant="overline"
                sx={{
                  fontWeight: 800,
                  color: "secondary.main",
                  letterSpacing: "0.1em",
                }}
              >
                Registry System
              </Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 1 }}>
              Businesses
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              Consolidated management of all organizational entities on the
              platform.
            </Typography>
          </Box>
        </Box>

        {/* Controls */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", md: "center" },
            gap: 2,
            mb: 4,
          }}
        >
          {/* Search */}
          <TextField
            placeholder="Search by name or email..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              flex: { xs: 1, md: 0 },
              minWidth: { xs: "100%", md: 280 },
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                bgcolor: "background.paper",
                boxShadow: theme.customShadows.sm,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Status Filter */}
          <FormControl
            size="small"
            sx={{
              minWidth: { xs: "100%", md: 200 },
            }}
          >
            <Select
              value={statusFilter}
              onChange={(e: SelectChangeEvent) =>
                setStatusFilter(e.target.value)
              }
              sx={{
                borderRadius: 3,
                bgcolor: "background.paper",
                boxShadow: theme.customShadows.sm,
              }}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="approved">✓ Approved Only</MenuItem>
              <MenuItem value="pending">⏳ Pending Only</MenuItem>
              <MenuItem value="rejected">✗ Rejected Only</MenuItem>
              <MenuItem value="deleted">🗑 Deleted Only</MenuItem>
              <MenuItem value="no_branches">⚠️ No Branches</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Paper
        elevation={0}
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          width: "100%",
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
          bgcolor: "background.paper",
          boxShadow: theme.customShadows.soft,
        }}
      >
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            loading={isLoading}
            autoHeight
            pagination
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 20 },
              },
            }}
            pageSizeOptions={[10, 20, 50]}
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
            rowHeight={92}
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeader": {
                bgcolor: alpha(theme.palette.background.default, 0.4),
                borderBottom: "1.5px solid",
                borderColor: "divider",
                px: 4,
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: 800,
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "text.tertiary",
              },
              "& .MuiDataGrid-cell": {
                px: 4,
                borderColor: alpha(theme.palette.divider, 0.5),
              },
              "& .MuiDataGrid-row:hover": {
                bgcolor: alpha(theme.palette.primary.main, 0.02),
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "1.5px solid",
                borderColor: "divider",
              },
            }}
          />
        </Box>
      </Paper>

      <AnimatePresence>
        {selectedBusiness && (
          <Dialog
            open={Boolean(selectedBusiness)}
            onClose={() => setSelectedBusiness(null)}
            fullWidth
            maxWidth="lg"
            PaperProps={{
              sx: {
                borderRadius: 5,
                p: 0,
                boxShadow: theme.customShadows.xl,
                overflow: "hidden",
                position: "relative",
              },
            }}
          >
            {isUpdatingStatus && (
              <LinearProgress
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 6,
                  zIndex: 10,
                }}
              />
            )}
            <Box
              sx={{
                p: 5,
                background: theme.gradients.surface,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Avatar
                  src={selectedBusiness?.businessImageUrl || undefined}
                  variant="rounded"
                  sx={{
                    width: 80,
                    height: 80,
                    background: theme.gradients.primary,
                    color: "white",
                    borderRadius: 3,
                    boxShadow: theme.customShadows.md,
                  }}
                >
                  <BusinessIcon sx={{ fontSize: 36 }} />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5 }}>
                    {selectedBusiness?.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        bgcolor: "success.main",
                        borderRadius: "50%",
                      }}
                    />
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ fontWeight: 700 }}
                    >
                      Audit Console: {selectedBusiness?.branches.length}{" "}
                      Physical Records
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <DialogContent
              sx={{
                p: 0,
                opacity: isUpdatingStatus ? 0.6 : 1,
                pointerEvents: isUpdatingStatus ? "none" : "auto",
                transition: "all 0.3s ease",
              }}
            >
              <BranchList
                businessId={selectedBusiness.id}
                branches={selectedBusiness.branches}
                onUpdateStatus={(params) => {
                  updateStatus(params, {
                    onSuccess: () => setSelectedBusiness(null),
                  });
                }}
                onDeleteBranch={(branchId) => {
                  deleteBranch(branchId, {
                    onSuccess: () => {
                      // Update the local selectedBusiness state to remove the branch
                      setSelectedBusiness((prev) => {
                        if (!prev) return prev;
                        return {
                          ...prev,
                          branches: prev.branches.filter(
                            (b) => b.id !== branchId
                          ),
                        };
                      });
                    },
                  });
                }}
                isUpdatingStatus={isUpdatingStatus}
                isDeletingBranch={isDeletingBranch}
              />
            </DialogContent>
            <DialogActions sx={{ p: 4, bgcolor: "background.default" }}>
              <Button
                onClick={() => setSelectedBusiness(null)}
                variant="contained"
                disabled={isUpdatingStatus}
                sx={{
                  px: 6,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  color: "white",
                }}
              >
                Exit Audit Mode
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </AnimatePresence>
    </Box>
  );
};
