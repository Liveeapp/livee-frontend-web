import { Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
    <Box sx={{ 
      display: "flex", 
      minHeight: "100vh", 
      bgcolor: "background.default", 
      position: "relative",
      overflow: "hidden"
    }}>
      <TopBar onDrawerToggle={handleDrawerToggle} drawerWidth={DRAWER_WIDTH} />
      
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        drawerWidth={DRAWER_WIDTH}
        variant={isMobile ? "temporary" : "persistent"}
      />
      
      <Box
        component={motion.main}
        layout
        sx={{
          flexGrow: 1,
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          // Smooth layout transition for desktop when sidebar opens/closes
          marginLeft: {
            md: sidebarOpen && !isMobile ? 0 : 0, 
          },
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        <Toolbar />
        <Box 
          sx={{ 
            flexGrow: 1, 
            width: "100%", 
            maxWidth: "1600px",
            mx: "auto",
            p: { xs: 2, sm: 4, md: 6 },
            display: "flex",
            flexDirection: "column",
            overflow: "visible"
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={window.location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ width: "100%", display: "flex", flexDirection: "column", flexGrow: 1 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
};
