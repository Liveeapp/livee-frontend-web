import { Avatar, type AvatarProps, useTheme } from "@mui/material";

interface AvatarIconProps extends AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { width: 32, height: 32, fontSize: "0.75rem" },
  md: { width: 38, height: 38, fontSize: "0.9rem" },
  lg: { width: 52, height: 52, fontSize: "1rem" },
};

export const AvatarIcon = ({
  name,
  size = "md",
  sx,
  ...props
}: AvatarIconProps) => {
  const theme = useTheme();
  const sizeStyles = sizeMap[size];

  return (
    <Avatar
      sx={{
        ...sizeStyles,
        background: theme.gradients.primary,
        color: "white",
        fontWeight: 900,
        boxShadow: `0 4px 12px rgba(99, 102, 241, 0.3)`,
        ...sx,
      }}
      {...props}
    >
      {name?.charAt(0).toUpperCase()}
    </Avatar>
  );
};
