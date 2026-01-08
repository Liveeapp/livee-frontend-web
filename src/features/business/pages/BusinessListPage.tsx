import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Stack,
  useTheme,
} from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import {
  Delete as DeleteIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Visibility as ViewIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Business as BusinessIcon,
  Schedule as PendingIcon,
} from "@mui/icons-material";
import {
  useBusinesses,
  useUpdateBranchStatus,
  useDeleteBusiness,
} from "../hooks";
import type { BusinessModel, BranchModel, UpdateBranchStatusDto } from "../types";
import { useDeleteBranch } from "@/features/branches/hooks";
import {
  getBusinessTypeLabel,
  getStatusColor,
  formatBusinessHours,
  getStatusBadge,
  getBranchStatusCounts,
} from "../utils";

export const BusinessListPage = () => {
  const [page, setPage] = useState(0);
  const theme = useTheme();
  const [selectedBusiness, setSelectedBusiness] =
    useState<BusinessModel | null>(null);
  const { data, isLoading } = useBusinesses(page + 1);
  const { mutate: updateStatus, isPending: isUpdatingStatus } =
    useUpdateBranchStatus();
  const { mutate: deleteBusiness, isPending: isDeletingBusiness } =
    useDeleteBusiness();
  const { mutate: deleteBranch, isPending: isDeletingBranch } =
    useDeleteBranch();


  const columns: GridColDef[] = [
    {
      field: "businessImage",
      headerName: "",
      width: 70,
      sortable: false,
      renderCell: (params: GridRenderCellParams<BusinessModel>) => (
        <Avatar
          src={params.row.businessImageUrl || undefined}
          alt={params.row.name}
          sx={{ 
            width: 45, 
            height: 45, 
            bgcolor: "primary.main",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}
        >
          {params.row.name.charAt(0)}
        </Avatar>
      ),
    },
    { 
      field: "name", 
      headerName: "Business Name", 
      flex: 1.2, 
      minWidth: 150,
      renderCell: (params) => (
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {params.value}
        </Typography>
      )
    },
    {
      field: "businessType",
      headerName: "Category",
      flex: 1,
      minWidth: 120,
      renderCell: (params: GridRenderCellParams<BusinessModel>) => (
        <Chip
          label={getBusinessTypeLabel(params.row.businessType)}
          size="small"
          variant="outlined"
          sx={{ borderRadius: "6px", fontWeight: 500 }}
        />
      ),
    },
    {
      field: "user",
      headerName: "Owner Email",
      flex: 1.2,
      minWidth: 150,
      renderCell: (params) => (
        <Typography variant="body2" color="text.secondary">
          {params.row.user?.email || "N/A"}
        </Typography>
      )
    },
    {
      field: "branchStatus",
      headerName: "Internal Branches",
      flex: 1.5,
      minWidth: 220,
      renderCell: (params: GridRenderCellParams<BusinessModel>) => {
        const counts = getBranchStatusCounts(params.row.branches);
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Stack direction="row" spacing={1}>
              {counts.Approved > 0 && (
                <Tooltip title="Approved">
                  <Chip 
                    icon={<ApproveIcon sx={{ fontSize: "14px !important" }} />}
                    label={counts.Approved} 
                    size="small" 
                    color="success" 
                    variant="filled" 
                    sx={{ 
                      height: 20, 
                      bgcolor: "success.light", 
                      color: "success.contrastText",
                      "& .MuiChip-icon": { color: "inherit" }
                    }}
                  />
                </Tooltip>
              )}
              {counts.Pending > 0 && (
                <Tooltip title="Pending">
                  <Chip 
                    icon={<PendingIcon sx={{ fontSize: "14px !important" }} />}
                    label={counts.Pending} 
                    size="small" 
                    color="warning" 
                    variant="filled" 
                    sx={{ 
                      height: 20, 
                      bgcolor: "warning.light", 
                      color: "warning.contrastText",
                      "& .MuiChip-icon": { color: "inherit" }
                    }}
                  />
                </Tooltip>
              )}
            </Stack>
            <Button
              size="small"
              startIcon={<ViewIcon />}
              onClick={() => setSelectedBusiness(params.row)}
              sx={{ 
                textTransform: 'none', 
                fontWeight: 600,
                color: 'primary.main',
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              Manage
            </Button>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 80,
      sortable: false,
      align: "right",
      renderCell: (params: GridRenderCellParams<BusinessModel>) => (
        <IconButton
          color="error"
          size="small"
          disabled={isDeletingBusiness}
          onClick={() => {
            if (confirm("Delete this business and all its branches?"))
              deleteBusiness(params.row.id);
          }}
          sx={{ opacity: 0.7, '&:hover': { opacity: 1, bgcolor: 'error.light', color: 'error.contrastText' } }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Businesses
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Manage your partners and oversee branch approval status.
        </Typography>
      </Box>

      {/* Main Table Paper */}
      <Paper 
        elevation={0} 
        sx={{ 
          width: "100%", 
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden'
        }}
      >
        <DataGrid
          rows={data?.data || []}
          columns={columns}
          loading={isLoading}
          autoHeight
          paginationMode="server"
          rowCount={data?.pagination.totalItems || 0}
          paginationModel={{ page, pageSize: 20 }}
          onPaginationModelChange={(model) => setPage(model.page)}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick
          rowHeight={72}
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : '#F9FAFB',
              borderBottom: '1px solid',
              borderColor: 'divider',
            },
            "& .MuiDataGrid-cell": {
              borderBottom: '1px solid',
              borderColor: 'divider',
            },
            "& .MuiDataGrid-cell:focus": { outline: "none" },
          }}
        />
      </Paper>

      {/* Manage Branches Dialog */}
      <Dialog
        open={Boolean(selectedBusiness)}
        onClose={() => setSelectedBusiness(null)}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          sx: { borderRadius: 3, p: 1 }
        }}
      >
        <DialogTitle sx={{ px: 3, pt: 3, pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={selectedBusiness?.businessImageUrl || undefined} sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}>
              <BusinessIcon />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight="700">
                {selectedBusiness?.name}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Manage branch verification and details
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 0, borderTop: 'none' }}>
          {selectedBusiness && (
            <BranchList
              businessId={selectedBusiness.id}
              branches={selectedBusiness.branches}
              onUpdateStatus={updateStatus}
              onDeleteBranch={deleteBranch}
              isUpdatingStatus={isUpdatingStatus}
              isDeletingBranch={isDeletingBranch}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button 
            onClick={() => setSelectedBusiness(null)}
            variant="outlined"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

const BranchList = ({
  businessId,
  branches,
  onUpdateStatus,
  onDeleteBranch,
  isUpdatingStatus,
  isDeletingBranch,
}: {
  businessId: string;
  branches: BranchModel[];
  onUpdateStatus: (params: { businessId: string; data: UpdateBranchStatusDto }) => void;
  onDeleteBranch: (branchId: string) => void;
  isUpdatingStatus?: boolean;
  isDeletingBranch?: boolean;
}) => {
  const theme = useTheme();

  if (branches.length === 0) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <BusinessIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2, opacity: 0.2 }} />
        <Typography color="text.secondary" fontWeight="500">
          No branches found for this business.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : '#F9FAFB' }}>
              <TableCell sx={{ fontWeight: 600, py: 2 }}>Branch Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Operating Hours</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Control</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {branches.map((branch) => (
              <TableRow key={branch.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'action.hover' }}>
                      <LocationIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" fontWeight="600">
                        {branch.branchName}
                      </Typography>
                      {branch.isNewBranch && (
                        <Chip
                          label="New Registration"
                          size="small"
                          color="info"
                          sx={{ height: 18, fontSize: '0.65rem', fontWeight: 700, borderRadius: '4px' }}
                        />
                      )}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusBadge(branch.status)}
                    size="small"
                    color={getStatusColor(branch.status).replace('info', 'default') as "default" | "success" | "warning" | "error" | "info"}
                    variant="filled"
                    sx={{ 
                      fontWeight: 600, 
                      borderRadius: '6px',
                      bgcolor: `${getStatusColor(branch.status)}.light`,
                      color: `${getStatusColor(branch.status)}.contrastText`
                    }}
                  />
                </TableCell>
                <TableCell>
                  {branch.location ? (
                    <Tooltip title={branch.location.addressDescription}>
                      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 200 }} noWrap>
                        {branch.location.addressDescription}
                      </Typography>
                    </Tooltip>
                  ) : (
                    <Typography variant="caption" color="text.disabled" sx={{ fontStyle: 'italic' }}>
                      No coordinates
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {branch.businessHours && branch.businessHours.length > 0 ? (
                    <Tooltip title={formatBusinessHours(branch.businessHours)}>
                      <Chip
                        icon={<TimeIcon sx={{ fontSize: "14px !important" }} />}
                        label={`${branch.businessHours.length} Days`}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.75rem', borderRadius: '6px' }}
                      />
                    </Tooltip>
                  ) : (
                    <Typography variant="caption" color="text.disabled">
                      Closed session
                    </Typography>
                  )}
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    {branch.status !== "Approved" && (
                      <Tooltip title="Approve Verification">
                        <IconButton
                          size="small"
                          color="success"
                          disabled={isUpdatingStatus}
                          onClick={() =>
                            onUpdateStatus({
                              businessId,
                              data: {
                                status: "Approved",
                                branchId: branch.id,
                              },
                            })
                          }
                          sx={{ bgcolor: 'success.light', color: 'success.contrastText', '&:hover': { bgcolor: 'success.main' } }}
                        >
                          <ApproveIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {branch.status !== "Rejected" && (
                      <Tooltip title="Deny Application">
                        <IconButton
                          size="small"
                          color="error"
                          disabled={isUpdatingStatus}
                          onClick={() =>
                            onUpdateStatus({
                              businessId,
                              data: {
                                status: "Rejected",
                                branchId: branch.id,
                              },
                            })
                          }
                          sx={{ bgcolor: 'error.light', color: 'error.contrastText', '&:hover': { bgcolor: 'error.main' } }}
                        >
                          <RejectIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    <IconButton
                      size="small"
                      disabled={isDeletingBranch}
                      onClick={() => {
                        if (confirm("Permanently delete this branch?")) {
                          onDeleteBranch(branch.id);
                        }
                      }}
                      sx={{ 
                        '&:hover': { 
                          bgcolor: 'error.light', 
                          color: 'error.contrastText' 
                        } 
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
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
