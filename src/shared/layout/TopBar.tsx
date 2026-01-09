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
  InputBase,
  Paper,
  Fade,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Settings as ProfileIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
  ChevronRightRounded as ArrowIcon,
  AnalyticsRounded as DashboardIcon,
  BusinessCenterRounded as RegistryIcon,
  VerifiedUserRounded as AuditIcon,
  AdminPanelSettingsRounded as SecurityIcon,
} from "@mui/icons-material";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store";
import { ROUTES } from "@/shared/constants";
import { alpha, useTheme } from "@mui/material/styles";

interface TopBarProps {
  onDrawerToggle: () => void;
  drawerWidth: number;
}

export const TopBar = ({ onDrawerToggle }: TopBarProps) => {
  const theme = useTheme();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState("");

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

  const searchResults = useMemo(() => {
    if (!searchValue) return [];
    const searchOptions = [
      {
        label: "Operational Dashboard",
        keywords: "dashboard stats overview growth analytics metrics",
        path: ROUTES.ADMIN.DASHBOARD,
        category: "System",
        icon: <DashboardIcon fontSize="small" color="primary" />,
      },
      {
        label: "Commercial Registry",
        keywords: "business partners companies registry list management",
        path: ROUTES.ADMIN.BUSINESSES,
        category: "Entities",
        icon: <RegistryIcon fontSize="small" color="secondary" />,
      },
      {
        label: "Compliance Audit",
        keywords:
          "verification branches locations approval audit reject verified",
        path: ROUTES.ADMIN.BUSINESSES,
        category: "Compliance",
        icon: <AuditIcon fontSize="small" color="success" />,
      },
      {
        label: "Administrative Settings",
        keywords: "profile account settings edit personal info",
        path: ROUTES.ADMIN.PROFILE,
        category: "Account",
        icon: <ProfileIcon fontSize="small" color="info" />,
      },
      {
        label: "Platform Security",
        keywords: "security keys private secret protection access",
        path: ROUTES.ADMIN.PROFILE,
        category: "Security",
        icon: <SecurityIcon fontSize="small" color="error" />,
      },
    ];

    const searchLower = searchValue.toLowerCase();
    return searchOptions.filter(
      (opt) =>
        opt.label.toLowerCase().includes(searchLower) ||
        opt.category.toLowerCase().includes(searchLower) ||
        opt.keywords.toLowerCase().includes(searchLower)
    );
  }, [searchValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: "none",
        borderBottom: "1px solid",
        borderColor: "divider",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "saturate(180%) blur(20px)",
        color: "text.primary",
        backgroundImage: "none",
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 4 }, minHeight: { xs: 64, md: 72 } }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            gap: { xs: 2, md: 4 },
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: 900,
              display: { xs: "none", sm: "block" },
              background: theme.gradients.primary,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
            onClick={() => navigate(ROUTES.ADMIN.DASHBOARD)}
          >
            Livee
          </Typography>

          <Box sx={{ position: "relative", width: { xs: "auto", lg: 400 } }}>
            <Box
              sx={{
                display: { xs: "none", lg: "flex" },
                alignItems: "center",
                bgcolor: "action.hover",
                px: 2,
                py: 0.85,
                borderRadius: 3,
                border: "1px solid",
                borderColor: searchValue ? "primary.main" : "divider",
                transition: "all 0.2s",
                "&:focus-within": {
                  borderColor: "primary.main",
                  bgcolor: "background.paper",
                  boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
                },
              }}
            >
              <SearchIcon
                fontSize="small"
                sx={{ mr: 1, color: "text.tertiary" }}
              />
              <InputBase
                placeholder="Search metrics, registry, or security..."
                value={searchValue}
                onChange={handleSearchChange}
                onBlur={() => setTimeout(() => setSearchValue(""), 200)}
                sx={{ flex: 1, fontSize: "0.875rem", fontWeight: 600 }}
              />
              <Box
                sx={{
                  ml: "auto",
                  bgcolor: "divider",
                  px: 0.75,
                  py: 0.25,
                  borderRadius: 1.5,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 800, fontSize: "0.65rem" }}
                >
                  ⌘K
                </Typography>
              </Box>
            </Box>

            <Fade in={Boolean(searchValue)}>
              <Paper
                elevation={24}
                sx={{
                  position: "absolute",
                  top: "calc(100% + 12px)",
                  left: 0,
                  right: 0,
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                  overflow: "hidden",
                  zIndex: 2000,
                  bgcolor: "background.paper",
                  boxShadow: theme.customShadows.xl,
                }}
              >
                {searchResults.length > 0 ? (
                  searchResults.map((result, idx) => (
                    <MenuItem
                      key={idx}
                      onClick={() => {
                        if (result.path) navigate(result.path);
                        setSearchValue("");
                      }}
                      sx={{
                        py: 2,
                        px: 2.5,
                        display: "flex",
                        gap: 2,
                        transition: "all 0.2s",
                        "&:hover": {
                          bgcolor: "action.hover",
                          "& .arrow-icon": {
                            transform: "translateX(4px)",
                            opacity: 1,
                          },
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          bgcolor: alpha(theme.palette.divider, 0.1),
                        }}
                      >
                        {result.icon}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 800,
                            color: "text.primary",
                            lineHeight: 1.2,
                          }}
                        >
                          {result.label}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.tertiary"
                          sx={{
                            fontWeight: 700,
                            textTransform: "uppercase",
                            fontSize: "0.65rem",
                          }}
                        >
                          {result.category}
                        </Typography>
                      </Box>
                      <ArrowIcon
                        className="arrow-icon"
                        fontSize="small"
                        sx={{
                          color: "primary.main",
                          opacity: 0,
                          transition: "all 0.2s",
                        }}
                      />
                    </MenuItem>
                  ))
                ) : (
                  <Box sx={{ p: 5, textAlign: "center" }}>
                    <SearchIcon
                      sx={{ fontSize: 40, color: "divider", mb: 1.5 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, color: "text.secondary" }}
                    >
                      No results for "{searchValue}"
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.tertiary", fontWeight: 600 }}
                    >
                      Try searching for 'security', 'audit', or 'metrics'
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Fade>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1.5 },
          }}
        >
          <Box
            onClick={handleMenuOpen}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              p: 0.5,
              pr: { xs: 0.5, sm: 1.5 },
              borderRadius: 3,
              cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <Avatar
              sx={{
                width: 38,
                height: 38,
                background: theme.gradients.primary,
                fontSize: "0.9rem",
                fontWeight: 900,
                boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
                color: "white",
              }}
            >
              {user?.fullName?.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 800, lineHeight: 1, color: "text.primary" }}
              >
                {user?.fullName}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  fontSize: "0.65rem",
                  color: "text.tertiary",
                }}
              >
                ADMIN CONTEXT
              </Typography>
            </Box>
          </Box>

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
                  minWidth: 260,
                  borderRadius: 4,
                  boxShadow: theme.customShadows.xl,
                  border: "1px solid",
                  borderColor: "divider",
                  p: 1,
                  bgcolor: "background.paper",
                  backgroundImage: "none",
                },
              },
            }}
          >
            <Box sx={{ px: 2.5, py: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>
                Account Control
              </Typography>
              <Typography
                variant="caption"
                color="text.tertiary"
                sx={{ fontWeight: 800, textTransform: "uppercase" }}
              >
                System Admin
              </Typography>
            </Box>
            <Divider sx={{ my: 1, mx: 1 }} />
            <MenuItem
              onClick={handleProfileClick}
              sx={{ borderRadius: 2.5, py: 1.5, mx: 0.5 }}
            >
              <ListItemIcon>
                <ProfileIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2" sx={{ fontWeight: 800 }}>
                Profile & Access
              </Typography>
            </MenuItem>
            <Divider sx={{ my: 1, mx: 1 }} />
            <MenuItem
              onClick={() => {
                useAuthStore.getState().logout();
                handleMenuClose();
              }}
              sx={{ borderRadius: 2.5, py: 1.5, mx: 0.5, color: "error.main" }}
            >
              <ListItemIcon>
                <LogoutIcon fontSize="small" color="error" />
              </ListItemIcon>
              <Typography variant="body2" sx={{ fontWeight: 900 }}>
                Sign Out Platform
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
