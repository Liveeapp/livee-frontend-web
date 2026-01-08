import { Card, Box, Typography, Avatar } from "@mui/material";
import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  color?: "primary" | "success" | "warning" | "error" | "info";
}

export const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  color = "primary",
}: StatCardProps) => {
  const colorMap = {
    primary: "#2563EB",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
  };

  return (
    <Card
      sx={{
        p: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mb: 1, fontWeight: 500 }}
          >
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {value}
          </Typography>
          {subtitle && (
            <Typography
              variant="caption"
              color="success.main"
              sx={{ fontWeight: 500 }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        {icon && (
          <Avatar
            sx={{
              bgcolor: colorMap[color],
              width: 48,
              height: 48,
              color: "white",
            }}
          >
            {icon}
          </Avatar>
        )}
      </Box>
    </Card>
  );
};
