import { Card, Box, Typography, LinearProgress } from "@mui/material";

interface ProgressItemProps {
  label: string;
  value: number;
  color?: string;
}

export const ProgressItem = ({
  label,
  value,
  color = "#2563EB",
}: ProgressItemProps) => (
  <Box sx={{ mb: 2 }}>
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600, color }}>
        {value}%
      </Typography>
    </Box>
    <LinearProgress
      variant="determinate"
      value={value}
      sx={{
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(0, 0, 0, 0.08)",
        "& .MuiLinearProgress-bar": {
          borderRadius: 4,
          backgroundColor: color,
        },
      }}
    />
  </Box>
);

interface ProgressCardProps {
  title: string;
  items: ProgressItemProps[];
}

export const ProgressCard = ({ title, items }: ProgressCardProps) => (
  <Card sx={{ p: 3 }}>
    <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
      {title}
    </Typography>
    <Box>
      {items.map((item) => (
        <ProgressItem
          key={item.label}
          label={item.label}
          value={item.value}
          color={item.color}
        />
      ))}
    </Box>
  </Card>
);
