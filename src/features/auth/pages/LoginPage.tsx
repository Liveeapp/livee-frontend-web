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
        background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '140%',
          height: '140%',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, transparent 60%)',
          top: '-20%',
          left: '-20%',
        }
      }}
    >
      <Card 
        elevation={0}
        sx={{ 
          maxWidth: 440, 
          width: '100%', 
          mx: 2, 
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 20px 60px rgba(0,0,0,0.05)',
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 6 } }}>
          <Box sx={{ mb: 5, textAlign: 'center' }}>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 900, 
                color: 'primary.main',
                letterSpacing: '-0.05em',
                mb: 1
              }}
            >
              LIVEE
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
              Console Access
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Secure administrator authentication
            </Typography>
          </Box>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3, 
                borderRadius: 2,
                bgcolor: 'error.lighter',
                color: 'error.main',
                border: 'none'
              }}
            >
              Invalid credentials. Please verify and try again.
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: 'block', color: 'text.secondary', textTransform: 'uppercase', ml: 0.5 }}>
                Email Address
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
                      <EmailIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2.5,
                    bgcolor: 'background.paper'
                  }
                }}
              />
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: 'block', color: 'text.secondary', textTransform: 'uppercase', ml: 0.5 }}>
                Password
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
                      <LockIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2.5,
                    bgcolor: 'background.paper'
                  }
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
                height: 54, 
                borderRadius: 2.5,
                fontWeight: 700,
                fontSize: '1rem',
                textTransform: 'none',
                boxShadow: '0 8px 16px rgba(37, 99, 235, 0.2)',
                '&:hover': {
                  boxShadow: '0 12px 24px rgba(37, 99, 235, 0.3)',
                }
              }}
            >
              {isPending ? <CircularProgress size={24} color="inherit" /> : 'Enter Console'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Typography 
        variant="caption" 
        sx={{ 
          position: 'absolute', 
          bottom: 24, 
          color: 'text.disabled',
          fontWeight: 600
        }}
      >
        © 2026 Livee Platform. Internal Use Only.
      </Typography>
    </Box>
  );
};
