import {
  Box,
  Card,
  Avatar,
  Typography,
  Divider,
  useTheme,
  Stack,
  alpha,
} from "@mui/material";
import { 
  SecurityRounded as SecurityIcon,
  PersonRounded as ProfileIcon,
  VerifiedUserRounded as VerifiedIcon,
} from "@mui/icons-material";
import { useAuthStore } from "@/features/auth/store";

export const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);
  const theme = useTheme();

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <Box sx={{ p: 0.5, bgcolor: "info.main", color: "white", borderRadius: 1, display: "flex" }}>
            <ProfileIcon fontSize="small" />
          </Box>
          <Typography variant="overline" sx={{ fontWeight: 800, color: "info.main", letterSpacing: "0.1em" }}>
            Personal Settings
          </Typography>
        </Box>
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 1 }}>
          Profile
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
          Manage your account information and preferences.
        </Typography>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1.5fr 1fr" }, gap: 4 }}>
        <Stack spacing={4}>
          {/* Main Info Card */}
          <Card sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4 }}>
            <Box sx={{ display: "flex", flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, mb: 5, gap: 4 }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "primary.main",
                  fontSize: "2.5rem",
                  fontWeight: 900,
                  boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)',
                  borderRadius: 4
                }}
              >
                {user?.fullName?.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                  <Typography variant="h4" sx={{ fontWeight: 900 }}>
                    {user?.fullName}
                  </Typography>
                  <VerifiedIcon color="primary" sx={{ fontSize: 24 }} />
                </Box>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                  <Box sx={{ bgcolor: "success.main", color: "white", px: 1.5, py: 0.5, borderRadius: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 800 }}>
                      ADMINISTRATOR
                    </Typography>
                  </Box>
                  <Box sx={{ bgcolor: "action.hover", px: 1.5, py: 0.5, borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary" }}>
                      ID: {user?.id?.slice(0, 10).toUpperCase()}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>

            <Divider sx={{ mb: 5 }} />

            <Typography variant="overline" sx={{ color: 'text.tertiary', fontWeight: 900, mb: 3, display: 'block' }}>
              Account Information
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 5,
              }}
            >
              <Box>
                <Typography variant="caption" color="text.tertiary" sx={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.65rem', mb: 0.75, display: 'block' }}>
                  Full Name
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  {user?.fullName}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.tertiary" sx={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.65rem', mb: 0.75, display: 'block' }}>
                  Email Address
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  {user?.email}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Stack>

        <Stack spacing={4}>
          {/* Security Summary Card */}
          <Card sx={{ p: 4, borderRadius: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
              <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: 'error.main', color: 'white', display: 'flex' }}>
                <SecurityIcon fontSize="small" />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Access Control
              </Typography>
            </Box>

            <Box sx={{ mb: 0 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: "text.secondary", mb: 2 }}>
                Current Permission Level:
              </Typography>
              <Box 
                sx={{ 
                  p: 2, 
                  borderRadius: 2, 
                  border: "1px solid", 
                  borderColor: "success.main", 
                  bgcolor: alpha(theme.palette.success.main, 0.05),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 900, color: "success.main" }}>
                  ADMIN ACCESS
                </Typography>
                <VerifiedIcon fontSize="small" color="success" />
              </Box>
            </Box>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
};
