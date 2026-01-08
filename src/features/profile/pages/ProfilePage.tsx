import {
  Container,
  Box,
  Card,
  Avatar,
  Typography,
  Divider,
  Switch,
  useTheme,
} from "@mui/material";
import { 
  Palette as ThemeIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";
import { useAuthStore } from "@/features/auth/store";
import { useUIStore } from "@/shared/ui/uiStore";

export const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);
  const theme = useTheme();
  const { darkMode, toggleDarkMode } = useUIStore();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.02em' }}>
          Account Settings
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Manage your console profile and customize your workspace experience.
        </Typography>
      </Box>

      {/* Main Info Card */}
      <Card 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 3, 
          borderRadius: 3, 
          border: '1px solid', 
          borderColor: 'divider',
          bgcolor: 'background.paper'
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 4, gap: 3 }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: "primary.main",
              fontSize: "2.5rem",
              fontWeight: 800,
              boxShadow: '0 8px 24px rgba(37, 99, 235, 0.2)'
            }}
          >
            {user?.fullName?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
              {user?.fullName}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ bgcolor: 'action.hover', px: 1.5, py: 0.5, borderRadius: 1.5, display: 'inline-block' }}>
              System Administrator
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="overline" sx={{ color: 'text.disabled', fontWeight: 800, mb: 2, display: 'block' }}>
          Personal Information
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 4,
          }}
        >
          <Box>
            <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem', mb: 0.5, display: 'block' }}>
              Full Identity
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {user?.fullName}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem', mb: 0.5, display: 'block' }}>
              Electronic Mail
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {user?.email}
            </Typography>
          </Box>
        </Box>
      </Card>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        {/* Workspace Card */}
        <Card 
          elevation={0} 
          sx={{ 
            p: 3, 
            borderRadius: 3, 
            border: '1px solid', 
            borderColor: 'divider'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'primary.light', color: 'primary.main', display: 'flex' }}>
              <ThemeIcon fontSize="small" />
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
              Workspace
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
              borderRadius: 2,
            }}
          >
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Dark Atmosphere
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Ideal for low-light management
              </Typography>
            </Box>
            <Switch checked={darkMode} onChange={toggleDarkMode} />
          </Box>
        </Card>

        {/* Security Summary Card */}
        <Card 
          elevation={0} 
          sx={{ 
            p: 3, 
            borderRadius: 3, 
            border: '1px solid', 
            borderColor: 'divider'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'error.light', color: 'error.main', display: 'flex' }}>
              <SecurityIcon fontSize="small" />
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
              Security
            </Typography>
          </Box>

          <Box sx={{ p: 2, bgcolor: 'error.lighter', borderRadius: 2, color: 'error.main' }}>
            <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', mb: 0.5 }}>
              Protected Access
            </Typography>
            <Typography variant="caption" sx={{ lineHeight: 1.4 }}>
              Your account is secured with administrator privileges. Password resets are handled by technical support.
            </Typography>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};
