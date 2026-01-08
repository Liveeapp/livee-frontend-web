import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { 
  Menu as MenuIcon, 
  Settings as ProfileIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store";
import { ROUTES } from "@/shared/constants";

interface TopBarProps {
  onDrawerToggle: () => void;
  drawerWidth: number;
}

export const TopBar = ({ onDrawerToggle }: TopBarProps) => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate(ROUTES.ADMIN.PROFILE);
    handleMenuClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(8px)",
        color: "text.primary",
        boxShadow: "none",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 4 } }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ 
            flexGrow: 1, 
            fontWeight: 800, 
            letterSpacing: '-0.02em',
            fontSize: '1.25rem'
          }}
        >
          Livee Console
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{ display: { xs: "none", sm: "block" }, textAlign: 'right' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1 }}>
              {user?.fullName}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Administrator
            </Typography>
          </Box>
          <IconButton onClick={handleMenuOpen} sx={{ p: 0.5 }}>
            <Avatar 
              sx={{ 
                width: 36, 
                height: 36, 
                bgcolor: 'primary.main',
                fontSize: '1rem',
                fontWeight: 600
              }}
            >
              {user?.fullName?.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{
              paper: {
                sx: { 
                  mt: 1.5, 
                  minWidth: 200, 
                  borderRadius: 3,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  border: '1px solid',
                  borderColor: 'divider',
                  p: 1
                }
              }
            }}
          >
            <MenuItem onClick={handleProfileClick} sx={{ borderRadius: 1.5, py: 1 }}>
              <ListItemIcon><ProfileIcon fontSize="small" /></ListItemIcon>
              My Profile
            </MenuItem>
            <Divider sx={{ my: 1 }} />
            <MenuItem
              onClick={() => {
                useAuthStore.getState().logout();
                handleMenuClose();
              }}
              sx={{ borderRadius: 1.5, py: 1, color: "error.main" }}
            >
              <ListItemIcon><LogoutIcon fontSize="small" color="error" /></ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
