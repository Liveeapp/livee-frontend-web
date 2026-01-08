import { Navigate, Outlet } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";
import { Security as SecurityIcon } from "@mui/icons-material";
import { useAuthStore } from "../store";

export const ProtectedRoutes = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !user.isAdmin) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ textAlign: "center", p: 4 }}>
            <SecurityIcon sx={{ fontSize: 80, color: "error.main", mb: 3 }} />
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Access Denied
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              You do not have the necessary permissions to access this area.
              Please contact your administrator if you believe this is an error.
            </Typography>
            <Button
              variant="contained"
              onClick={() => logout()}
              sx={{ mt: 3, px: 4 }}
            >
              Logout and Sign In as Admin
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return <Outlet />;
};
