import { Card, Box, Typography, useTheme, alpha } from "@mui/material";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
}

export const StatCard = ({ title, value, subtitle, icon, color = "primary" }: StatCardProps) => {
  const theme = useTheme();
  const gradient = theme.gradients[color === "info" ? "primary" : color];
  const colorToken = theme.palette[color === "info" ? "primary" : color];

  return (
    <Card
      component={motion.div}
      whileHover={{ y: -4, boxShadow: theme.customShadows.lg }}
      transition={{ duration: 0.2 }}
      sx={{ 
        p: 3, 
        height: "100%", 
        display: "flex", 
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        bgcolor: "background.paper",
        border: '1px solid',
        borderColor: 'divider',
        backgroundImage: 'none'
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 52,
            height: 52,
            borderRadius: 2,
            background: gradient,
            color: "white",
            boxShadow: `0 8px 16px -4px ${alpha(colorToken.main, 0.4)}`,
          }}
        >
          {icon}
        </Box>
      </Box>

      <Typography variant="overline" sx={{ fontWeight: 800, color: "text.secondary", mb: 0.5, letterSpacing: '0.12em', fontSize: '0.7rem' }}>
        {title}
      </Typography>

      <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, letterSpacing: "-0.01em", color: "text.primary" }}>
        {value}
      </Typography>

      <Typography variant="caption" sx={{ fontWeight: 700, color: "text.tertiary" }}>
        {subtitle}
      </Typography>

      {/* Modern background glow icon */}
      <Box 
        sx={{ 
          position: "absolute", 
          right: -10, 
          bottom: -10, 
          opacity: 0.04, 
          transform: "scale(3)",
          color: colorToken.main
        }}
      >
        {icon}
      </Box>
    </Card>
  );
};
