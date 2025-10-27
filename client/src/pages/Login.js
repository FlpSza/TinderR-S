import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { Visibility, VisibilityOff, Language, AccountCircle } from '@mui/icons-material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from '../i18n';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  
  const { login } = useContext(AuthContext);
  const { t, language, changeLanguage } = useTranslation();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setEmailError(t('login.emailInvalid'));
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length > 0 && e.target.value.length < 6) {
      setPasswordError(t('register.passwordMin'));
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setEmailError('');
    setPasswordError('');

    // Validações
    if (!email) {
      setEmailError(t('login.emailRequired'));
      return;
    }
    if (!validateEmail(email)) {
      setEmailError(t('login.emailInvalid'));
      return;
    }
    if (!password) {
      setPasswordError(t('login.passwordRequired'));
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/auth/login', { email, password });
      login(response.data.token, response.data.user);
      if (rememberMe) {
        localStorage.setItem('rememberEmail', email);
      }
    } catch (err) {
      setError(err.response?.data?.message || t('login.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageSelect = (lang) => {
    changeLanguage(lang);
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          top: '-200px',
          right: '-200px',
          animation: 'float 6s ease-in-out infinite'
        },
        '@keyframes float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      }}
    >
      <Container maxWidth="sm">
        {/* Seletor de Idioma */}
        <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
          <IconButton
            onClick={handleLanguageMenu}
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' }
            }}
          >
            <Language />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => handleLanguageSelect('pt-BR')}>
              <ListItemIcon>🇧🇷</ListItemIcon>
              <ListItemText primary="Português" />
            </MenuItem>
            <MenuItem onClick={() => handleLanguageSelect('en')}>
              <ListItemIcon>🇺🇸</ListItemIcon>
              <ListItemText primary="English" />
            </MenuItem>
          </Menu>
        </Box>

        <Paper 
          elevation={10} 
          sx={{ 
            p: 5, 
            width: '100%', 
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Logo Estilo Tinder */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Box sx={{ position: 'relative', width: 120, height: 120, mb: 2 }}>
              {/* Círculo esquerdo - Roxo/Azul */}
              <Box
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6C5DD3 0%, #7F67E6 100%)',
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 1,
                  boxShadow: '0 4px 20px rgba(108, 93, 211, 0.4)'
                }}
              />
              {/* Círculo direito - Vermelho/Rosa */}
              <Box
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FE4655 0%, #FF5A6C 100%)',
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  boxShadow: '0 4px 20px rgba(254, 70, 85, 0.4)'
                }}
              />
              {/* Texto R&S centralizado */}
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 800,
                  color: 'white',
                  letterSpacing: '0.05em',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 3,
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}
              >
                R&S
              </Typography>
            </Box>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 600,
                color: '#333',
                letterSpacing: '0.02em'
              }}
            >
              Recruit & Select
            </Typography>
          </Box>
          
          <Typography variant="h6" gutterBottom align="center" sx={{ mb: 1, color: 'text.secondary', fontWeight: 400 }}>
            {t('login.title')}
          </Typography>
          <Typography variant="body2" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
            {t('login.subtitle')}
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label={t('login.email')}
              type="email"
              value={email}
              onChange={handleEmailChange}
              margin="normal"
              error={!!emailError}
              helperText={emailError}
              autoComplete="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              fullWidth
              label={t('login.password')}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              margin="normal"
              error={!!passwordError}
              helperText={passwordError}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    size="small"
                  />
                }
                label={t('login.rememberMe')}
              />
              <Typography variant="body2" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                {t('login.forgotPassword')}
              </Typography>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ 
                mt: 3, 
                mb: 2, 
                bgcolor: '#FE4655',
                height: 48,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 2,
                '&:hover': { 
                  bgcolor: '#FF5A6C',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(254, 70, 85, 0.3)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : t('login.loginButton')}
            </Button>
          </form>

          <Typography align="center" sx={{ mt: 3 }}>
            {t('login.noAccount')}{' '}
            <Link 
              to="/register" 
              style={{ 
                color: '#FE4655', 
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              {t('login.signUp')}
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;

