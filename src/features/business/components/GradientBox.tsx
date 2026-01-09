import { Box, useTheme } from "@mui/material";
import React from "react";
import type { SxProps, Theme } from "@mui/material/styles";

type GradientType =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

interface GradientBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient: GradientType;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const GradientBox = ({
  gradient,
  children,
  sx,
  ...props
}: GradientBoxProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: theme.gradients[gradient],
        color: "white",
        borderRadius: 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
