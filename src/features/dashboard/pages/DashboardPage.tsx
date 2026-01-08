import { Box, Typography, Container, CircularProgress } from "@mui/material";
import {
  Business as BusinessIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { useMemo } from "react";
import { StatCard, ProgressCard } from "../components";
import { useBusinesses } from "@/features/business/hooks";
import { getBranchStatusCounts, getBusinessTypeLabel } from "@/features/business/utils";

export const DashboardPage = () => {
  // Fetch a larger snapshot for calculations
  const { data, isLoading } = useBusinesses(1, 100);
  
  const stats = useMemo(() => {
    if (!data?.data) return { approved: 0, pending: 0, categories: {} as Record<string, number> };
    
    let approved = 0;
    let pending = 0;
    const categories: Record<string, number> = {};

    data.data.forEach(business => {
      const counts = getBranchStatusCounts(business.branches);
      approved += counts.Approved;
      pending += counts.Pending;

      const cat = business.businessType || "Other";
      categories[cat] = (categories[cat] || 0) + 1;
    });

    return { approved, pending, categories };
  }, [data]);

  const progressItems = useMemo(() => {
    const total = data?.pagination.totalItems || 1;
    return Object.entries(stats.categories)
      .map(([label, count]) => ({
        label: getBusinessTypeLabel(label),
        value: Math.round((count / total) * 100),
        color: "#2563EB"
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [stats.categories, data?.pagination.totalItems]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Overview
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Real-time snapshot of your platform's business network and verification queue.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        <StatCard
          title="Total Businesses"
          value={data?.pagination.totalItems.toLocaleString() || "0"}
          subtitle="Registered partners"
          icon={<BusinessIcon />}
          color="primary"
        />
        <StatCard
          title="Approved Branches"
          value={stats.approved}
          subtitle="Verified and active"
          icon={<CheckCircleIcon />}
          color="success"
        />
        <StatCard
          title="Pending Requests"
          value={stats.pending}
          subtitle="Requiring attention"
          icon={<ScheduleIcon />}
          color="warning"
        />
      </Box>

      {/* Progress Section */}
      <Box sx={{ mt: 3 }}>
        <ProgressCard
          title="Business Category Breakdown"
          items={progressItems}
        />
      </Box>
    </Container>
  );
};
