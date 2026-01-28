import { Box, Typography, CircularProgress, Grid } from "@mui/material";
import {
  BusinessRounded as BusinessIcon,
  CheckCircleRounded as CheckCircleIcon,
  ScheduleRounded as ScheduleIcon,
  TrendingUpRounded as GrowthIcon,
  CancelRounded as RejectedIcon,
} from "@mui/icons-material";
import { useMemo } from "react";
import { StatCard, ProgressCard } from "../components";
import { useBusinesses } from "@/features/business/hooks";
import {
  getBranchStatusCounts,
  getBusinessTypeLabel,
} from "@/features/business/utils";
import type { BusinessType } from "@/features/business/types";
export const DashboardPage = () => {
  // Fetch a larger snapshot for calculations
  const { data, isLoading } = useBusinesses();

  const stats = useMemo(() => {
    if (!data || !Array.isArray(data))
      return {
        approved: 0,
        pending: 0,
        rejected: 0,
        categories: {} as Record<string, number>,
      };

    let approved = 0;
    let pending = 0;
    let rejected = 0;
    const categories: Record<string, number> = {};

    data.forEach((business) => {
      const counts = getBranchStatusCounts(business.branches);
      approved += counts.Approved;
      pending += counts.Pending;
      rejected += counts.Rejected;

      const cat = business.businessType || "Other";
      categories[cat] = (categories[cat] || 0) + 1;
    });

    return { approved, pending, rejected, categories };
  }, [data]);

  const progressItems = useMemo(() => {
    const total = data?.length || 1;
    return Object.entries(stats.categories)
      .map(([label, count]) => ({
        label: getBusinessTypeLabel(label as BusinessType),
        value: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [stats.categories, data?.length]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          py: 10,
        }}
      >
        <CircularProgress
          size={32}
          thickness={5}
          sx={{ color: "primary.main" }}
        />
      </Box>
    );
  }

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <Box
            sx={{
              p: 0.5,
              bgcolor: "primary.main",
              color: "white",
              borderRadius: 1,
              display: "flex",
            }}
          >
            <GrowthIcon fontSize="small" />
          </Box>
          <Typography
            variant="overline"
            sx={{
              fontWeight: 800,
              color: "primary.main",
              letterSpacing: "0.1em",
            }}
          >
            Platform Overview
          </Typography>
        </Box>
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 1 }}>
          Dashboard
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontWeight: 500 }}
        >
          Manage your business network and track verification status.
        </Typography>
      </Box>

      {/* Stats Grid - Using Modern Grid syntax */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Businesses"
            value={Array.isArray(data) ? data.length.toLocaleString() : "0"}
            subtitle="Registered partners"
            icon={<BusinessIcon />}
            color="primary"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Approved Branches"
            value={stats.approved}
            subtitle="Fully verified"
            icon={<CheckCircleIcon />}
            color="success"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Pending Approvals"
            value={stats.pending}
            subtitle="Require manual review"
            icon={<ScheduleIcon />}
            color="warning"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Rejected Records"
            value={stats.rejected}
            subtitle="Compliance failures"
            icon={<RejectedIcon />}
            color="error"
          />
        </Grid>
      </Grid>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 4 }}>
        <ProgressCard title="Business Categories" items={progressItems} />
      </Box>
    </Box>
  );
};
