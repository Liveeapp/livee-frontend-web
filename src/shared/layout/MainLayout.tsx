import { Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";
import { useUIStore } from "@/shared/ui/uiStore";

const DRAWER_WIDTH = 280;

export const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default", position: "relative" }}>
      <TopBar onDrawerToggle={handleDrawerToggle} drawerWidth={DRAWER_WIDTH} />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        drawerWidth={DRAWER_WIDTH}
        variant={isMobile ? "temporary" : "persistent"}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          // On desktop, if sidebar is persistent and open, we don't need margin if flex is working correctly
          // However, MUI Drawer persistent with fixed position doesn't push the content unless we add margin.
          marginLeft: {
            md: sidebarOpen && !isMobile ? 0 : 0, 
          },
          maxWidth: "100%",
          overflow: "hidden", // Prevent main container from overflowing
        }}
      >
        <Toolbar />
        <Box sx={{ 
          flexGrow: 1, 
          width: "100%", 
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "auto" // Allow content to scroll if it's too wide
        }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
