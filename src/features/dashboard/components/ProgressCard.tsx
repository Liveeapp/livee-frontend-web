import {
  Card,
  Box,
  Typography,
  LinearProgress,
  Stack,
  useTheme,
  alpha,
} from "@mui/material";

interface ProgressItem {
  label: string;
  value: number;
  color?: "primary" | "secondary" | "success" | "warning" | "info";
}

interface ProgressCardProps {
  title: string;
  items: ProgressItem[];
}

export const ProgressCard = ({ title, items }: ProgressCardProps) => {
  const theme = useTheme();

  return (
    <Card sx={{ p: 4, height: "100%", borderRadius: 4, bgcolor: "background.paper", backgroundImage: 'none' }}>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 4, color: 'text.primary' }}>
        {title}
      </Typography>
      
      <Stack spacing={4}>
        {items.map((item) => {
          const itemColor = item.color || "primary";
          const gradient = theme.gradients[itemColor === "info" ? "primary" : itemColor];
          
          return (
            <Box key={item.label}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5, alignItems: "center" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "text.secondary" }}>
                  {item.label}
                </Typography>
                <Box 
                  sx={{ 
                    px: 1.5, 
                    py: 0.5, 
                    borderRadius: 1.5, 
                    background: gradient, 
                    color: "white",
                    boxShadow: theme.customShadows.sm
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 900, letterSpacing: '0.02em' }}>
                    {item.value}%
                  </Typography>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={item.value}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  bgcolor: alpha('#000', 0.04),
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 5,
                    background: gradient,
                  },
                }}
              />
            </Box>
          );
        })}
      </Stack>

      {items.length === 0 && (
        <Box sx={{ py: 6, textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "text.tertiary", fontWeight: 600 }}>
            No distribution data.
          </Typography>
        </Box>
      )}
    </Card>
  );
};
