import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';

export const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: isDark
          ? 'linear-gradient(135deg, #111827 0%, #1F2937 100%)'
          : 'linear-gradient(135deg, #F3F4F6 0%, #FFFFFF 100%)',
      }}
    >
      {/* Hero Section */}
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              mb: 2,
              background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2.5rem', md: '4rem' }
            }}
          >
            Livee Admin
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              mb: 4,
              fontWeight: 500,
            }}
          >
            Streamline your business operations with our powerful management platform.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 6,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.8,
            }}
          >
            Access real-time insights, manage business listings, and oversee branch approvals through a single, unified interface designed for efficiency.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowRightIcon />}
              onClick={() => navigate(ROUTES.ADMIN.DASHBOARD)}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 24px rgba(37, 99, 235, 0.3)',
                },
              }}
            >
              Enter Dashboard
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate(ROUTES.ADMIN.BUSINESSES)}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2,
                border: `2px solid ${theme.palette.primary.main}`,
                '&:hover': {
                  backgroundColor: `${theme.palette.primary.main}08`,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Manage Businesses
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ mt: 'auto', py: 4, textAlign: 'center', borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} Livee Admin Console. Secure Internal Access Only.
        </Typography>
      </Box>
    </Box>
  );
};
