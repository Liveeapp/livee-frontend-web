import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import {
  DashboardRounded as DashboardIcon,
  BusinessRounded as BusinessIcon,
  LogoutRounded as LogoutIcon,
  PersonRounded as ProfileIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store";
import { ROUTES } from "@/shared/constants";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  drawerWidth: number;
  variant: "permanent" | "persistent" | "temporary";
}

const MENU_ITEMS = [
  { text: "Dashboard", icon: <DashboardIcon />, path: ROUTES.ADMIN.DASHBOARD },
  { text: "Businesses", icon: <BusinessIcon />, path: ROUTES.ADMIN.BUSINESSES },
  { text: "Profile", icon: <ProfileIcon />, path: ROUTES.ADMIN.PROFILE },
];

export const Sidebar = ({
  open,
  onClose,
  drawerWidth,
  variant,
}: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const handleNavigate = (path: string) => {
    navigate(path);
    if (variant === "temporary") onClose();
  };

  return (
    <Drawer
      sx={{
        width: open ? drawerWidth : 0,
        flexShrink: 0,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          boxShadow: "none",
          borderRight: "1px solid",
          borderColor: "divider",
          bgcolor: 'background.paper',
          backgroundImage: 'none',
        },
      }}
      variant={variant}
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <Toolbar sx={{ px: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box 
          sx={{ 
            width: 32, 
            height: 32, 
            background: (theme) => theme.gradients.primary, 
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(99, 102, 241, 0.2)"
          }}
        >
          <Typography variant="h6" sx={{ color: "white", fontWeight: 900, lineHeight: 1 }}>L</Typography>
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 900, color: 'text.primary', letterSpacing: '-0.02em' }}>
          Livee
        </Typography>
      </Toolbar>
      
      <Box
        sx={{
          overflow: "auto",
          mt: 4,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          px: 2,
        }}
      >
        <Typography 
          variant="overline" 
          sx={{ 
            px: 2, 
            mb: 2, 
            fontWeight: 800, 
            color: 'text.tertiary',
            fontSize: "0.65rem",
            letterSpacing: "0.1em"
          }}
        >
          Management
        </Typography>
        
        <List sx={{ flex: 1, px: 0 }}>
          {MENU_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={isActive}
                  onClick={() => handleNavigate(item.path)}
                  sx={{
                    borderRadius: 2,
                    py: 1.25,
                    px: 2,
                    "&.Mui-selected": {
                      background: (theme) => theme.gradients.primary,
                      color: "white",
                      boxShadow: "0 4px 12px rgba(99, 102, 241, 0.2)",
                      "& .MuiListItemIcon-root": {
                        color: "white",
                      },
                      "&:hover": {
                        background: (theme) => theme.gradients.primary,
                        filter: "brightness(1.1)",
                      },
                    },
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                    transition: "all 0.15s ease",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: isActive ? "white" : "text.secondary" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ 
                      fontWeight: isActive ? 800 : 700,
                      fontSize: '0.9rem',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Divider sx={{ mb: 2 }} />
        
        <List sx={{ mb: 4 }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={logout}
              sx={{
                borderRadius: 2,
                py: 1.25,
                color: "error.main",
                "&:hover": {
                  bgcolor: "error.main",
                  color: "white",
                  "& .MuiListItemIcon-root": {
                    color: "white"
                  }
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Log Out" 
                primaryTypographyProps={{ fontWeight: 800, fontSize: '0.9rem' }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
