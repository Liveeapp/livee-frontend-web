import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';
import { motion } from 'framer-motion';

export const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: theme.palette.mode === 'dark'
          ? 'radial-gradient(circle at top right, #1E1B4B 0%, #0F172A 100%)'
          : 'radial-gradient(circle at top right, #EEF2FF 0%, #F9FAFB 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Dynamic Background Elements */}
      <Box 
        component={motion.div}
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        sx={{ 
          position: "absolute", 
          top: "-20%", 
          right: "-10%", 
          width: "60vw", 
          height: "60vw", 
          background: theme.gradients.primary,
          filter: "blur(120px)",
          borderRadius: "40%",
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ py: 8 }}>
          <Box 
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                mb: 3,
                background: theme.gradients.primary,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '3rem', md: '5rem' },
                lineHeight: 1
              }}
            >
              Master Your <br />
              Business Network
            </Typography>

            <Typography
              variant="h4"
              sx={{
                color: 'text.secondary',
                mb: 6,
                maxWidth: 700,
                fontWeight: 500,
                lineHeight: 1.4
              }}
            >
              The definitive administrative console for Livee partners. 
              Manage listings, audit verifications, and scale infrastructure with precision.
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowRightIcon />}
                onClick={() => navigate(ROUTES.ADMIN.DASHBOARD)}
                sx={{
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  borderRadius: 3,
                  boxShadow: "0 20px 40px -12px rgba(99, 102, 241, 0.4)",
                }}
              >
                Launch Dashboard
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate(ROUTES.ADMIN.BUSINESSES)}
                sx={{
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  borderRadius: 3,
                  borderWidth: 2,
                  "&:hover": { borderWidth: 2 }
                }}
              >
                Access Registry
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Footer Branding */}
      <Box sx={{ mt: 'auto', py: 6, textAlign: 'center', borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="overline" sx={{ color: 'text.tertiary', fontWeight: 800 }}>
          LIVEE INFRASTRUCTURE • SECURE CONSOLE ACCESS v2.5
        </Typography>
      </Box>
    </Box>
  );
};
