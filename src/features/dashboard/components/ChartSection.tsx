import { Typography, Card, useTheme, Box } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { name: "Jan", businesses: 40 },
  { name: "Feb", businesses: 52 },
  { name: "Mar", businesses: 68 },
  { name: "Apr", businesses: 78 },
  { name: "May", businesses: 90 },
  { name: "Jun", businesses: 102 },
];

export const ChartSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const chartColor = isDark ? "#E5E7EB" : "#374151";

  return (
    <Box sx={{ mt: 3 }}>
      <Card sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 4 }}>
          Platform Growth Trend
        </Typography>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#374151" : "#E5E7EB"}
              vertical={false}
            />
            <XAxis 
              dataKey="name" 
              stroke={chartColor} 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke={chartColor} 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                border: "none",
                borderRadius: 12,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Line
              type="monotone"
              dataKey="businesses"
              name="Total Businesses"
              stroke="#2563EB"
              strokeWidth={4}
              dot={{ fill: "#2563EB", r: 6, strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 8, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block', textAlign: 'center' }}>
          * Monthly growth of registered businesses across the platform.
        </Typography>
      </Card>
    </Box>
  );
};
