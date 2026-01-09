import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  useTheme,
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Email as EmailIcon, 
  Lock as LockIcon 
} from '@mui/icons-material';
import { useLogin } from '../hooks';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending, error } = useLogin();
  const theme = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.mode === 'dark' 
          ? 'radial-gradient(circle at top left, #1E1B4B 0%, #0F172A 100%)'
          : 'radial-gradient(circle at top left, #EEF2FF 0%, #F9FAFB 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '60%',
          height: '60%',
          background: theme.gradients.primary,
          filter: 'blur(160px)',
          opacity: theme.palette.mode === 'dark' ? 0.15 : 0.1,
          top: '-10%',
          left: '-10%',
          borderRadius: '50%',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '50%',
          height: '50%',
          background: theme.gradients.secondary,
          filter: 'blur(140px)',
          opacity: theme.palette.mode === 'dark' ? 0.15 : 0.1,
          bottom: '-10%',
          right: '-10%',
          borderRadius: '50%',
        }
      }}
    >
      <Card 
        elevation={0}
        sx={{ 
          maxWidth: 480, 
          width: '100%', 
          mx: 2, 
          borderRadius: 6,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: theme.palette.mode === 'dark' ? '0 40px 100px rgba(0,0,0,0.4)' : '0 40px 100px rgba(0,0,0,0.08)',
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <CardContent sx={{ p: { xs: 4, sm: 8 } }}>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Box 
              sx={{ 
                width: 60, 
                height: 60, 
                background: theme.gradients.primary, 
                borderRadius: 2.5, 
                display: "inline-flex", 
                alignItems: "center", 
                justifyContent: "center",
                mb: 3,
                boxShadow: "0 20px 40px -10px rgba(99, 102, 241, 0.4)"
              }}
            >
              <Typography variant="h4" sx={{ color: "white", fontWeight: 900 }}>L</Typography>
            </Box>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 900, 
                letterSpacing: '-0.04em',
                mb: 1,
                background: theme.gradients.primary,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Livee Console
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600 }}>
              Management interface for administrators
            </Typography>
          </Box>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 4, 
                borderRadius: 3,
                fontWeight: 600
              }}
            >
              Access denied. Credentials mismatch.
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="overline" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Email Identity
              </Typography>
              <TextField
                fullWidth
                placeholder="admin@livee.com"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: 'primary.main', fontSize: 22 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={{ mb: 5 }}>
              <Typography variant="overline" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Access Key
              </Typography>
              <TextField
                fullWidth
                placeholder="••••••••"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: 'primary.main', fontSize: 22 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={isPending}
              sx={{ 
                height: 60, 
                fontSize: '1.1rem',
                borderRadius: 3,
                boxShadow: "0 20px 40px -10px rgba(99, 102, 241, 0.4)",
                background: theme.gradients.primary,
              }}
            >
              {isPending ? <CircularProgress size={28} color="inherit" /> : 'Enter Platform'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Typography 
        variant="caption" 
        sx={{ 
          position: 'absolute', 
          bottom: 32, 
          color: 'text.tertiary',
          fontWeight: 800,
          letterSpacing: "0.1em"
        }}
      >
        © 2026 LIVEE ECOSYSTEM • INTERNAL OPS ONLY
      </Typography>
    </Box>
  );
};
