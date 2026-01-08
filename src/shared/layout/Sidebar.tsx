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
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  ExitToApp as LogoutIcon,
  Person as ProfileIcon,
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
  { text: "My Profile", icon: <ProfileIcon />, path: ROUTES.ADMIN.PROFILE },
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
          bgcolor: 'background.default',
        },
      }}
      variant={variant}
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <Toolbar sx={{ px: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 900, color: 'primary.main', letterSpacing: '-0.05em' }}>
          LIVEE
        </Typography>
      </Toolbar>
      
      <Box
        sx={{
          overflow: "auto",
          mt: 2,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          px: 1.5,
        }}
      >
        <Typography variant="caption" sx={{ px: 2, mb: 1, fontWeight: 700, color: 'text.disabled', textTransform: 'uppercase' }}>
          Main Menu
        </Typography>
        
        <List sx={{ flex: 1 }}>
          {MENU_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={isActive}
                  onClick={() => handleNavigate(item.path)}
                  sx={{
                    borderRadius: 2,
                    py: 1.2,
                    "&.Mui-selected": {
                      bgcolor: "primary.main",
                      color: "white",
                      "& .MuiListItemIcon-root": {
                        color: "white",
                      },
                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                    },
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ 
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.9rem'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        
        <Divider sx={{ my: 2, mx: 2 }} />
        
        <List sx={{ mb: 2 }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={logout}
              sx={{
                borderRadius: 2,
                py: 1.2,
                color: "error.main",
                "&:hover": {
                  bgcolor: "rgba(239, 68, 68, 0.08)",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Logout Session" 
                primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
