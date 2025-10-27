import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip
} from '@mui/material';
import { 
  WorkOutline, 
  People, 
  Favorite, 
  Person,
  Language,
  Notifications,
  TrendingUp,
  BusinessCenter,
  Settings
} from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from '../i18n';
import axios from 'axios';

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t, language, changeLanguage } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [langMenu, setLangMenu] = useState(null);
  const [notifMenu, setNotifMenu] = useState(null);
  const [stats, setStats] = useState({ activeJobs: 0, matches: 0, candidates: 0 });
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user?.userType === 'company') {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const response = await axios.get('/stats/company');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLangMenu = (event) => {
    setLangMenu(event.currentTarget);
  };

  const handleLanguageSelect = (lang) => {
    changeLanguage(lang);
    setLangMenu(null);
  };

  const handleNotifMenu = (event) => {
    setNotifMenu(event.currentTarget);
  };

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  const fetchNotifications = async () => {
    if (!user) return;
    
    try {
      const response = await axios.get('/notifications');
      // Adicionar tradução às mensagens
      const translatedNotifications = response.data.map(notif => {
        let translatedMessage = notif.message;
        
        if (notif.type === 'match') {
          if (user.userType === 'company') {
            translatedMessage = t('dashboard.newMatchCompany') + ' ' + notif.message;
          } else {
            translatedMessage = t('dashboard.newMatchCandidate') + ' ' + notif.message;
          }
        } else if (notif.type === 'message') {
          if (user.userType === 'company') {
            translatedMessage = t('dashboard.newMessageCompany') + ' ' + notif.message;
          } else {
            translatedMessage = t('dashboard.newMessageCandidate') + ' ' + notif.message;
          }
        }
        
        return { ...notif, translatedMessage };
      });
      
      setNotifications(translatedNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Fallback para mock em caso de erro
      setNotifications([]);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          {/* Header */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 4,
            background: 'white',
            p: 3,
            borderRadius: 3,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Logo */}
              <Box sx={{ position: 'relative', width: 48, height: 48 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6C5DD3 0%, #7F67E6 100%)',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    boxShadow: '0 2px 8px rgba(108, 93, 211, 0.3)'
                  }}
                />
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FE4655 0%, #FF5A6C 100%)',
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                    boxShadow: '0 2px 8px rgba(254, 70, 85, 0.3)'
                  }}
                />
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontWeight: 800,
                    color: 'white',
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 3,
                    textShadow: '0 1px 3px rgba(0,0,0,0.2)'
                  }}
                >
                  R&S
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#333', letterSpacing: '0.02em' }}>
                Recruit & Select
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Seletor de Idioma */}
              <IconButton onClick={handleLangMenu} size="small">
                <Language />
              </IconButton>
              <Menu anchorEl={langMenu} open={Boolean(langMenu)} onClose={() => setLangMenu(null)}>
                <MenuItem onClick={() => handleLanguageSelect('pt-BR')}>
                  <ListItemIcon>🇧🇷</ListItemIcon>
                  <ListItemText primary="Português" />
                </MenuItem>
                <MenuItem onClick={() => handleLanguageSelect('en')}>
                  <ListItemIcon>🇺🇸</ListItemIcon>
                  <ListItemText primary="English" />
                </MenuItem>
              </Menu>

              {/* Notificações */}
              <IconButton onClick={handleNotifMenu} size="small">
                <Badge badgeContent={notifications.filter(n => !n.read).length} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
              <Menu
                anchorEl={notifMenu}
                open={Boolean(notifMenu)}
                onClose={() => setNotifMenu(null)}
                PaperProps={{
                  sx: { width: 360, maxHeight: 480 }
                }}
              >
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {t('dashboard.notifications')}
                  </Typography>
                </Box>
                {notifications.length === 0 ? (
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      {t('dashboard.noNotifications')}
                    </Typography>
                  </Box>
                ) : (
                  notifications.map((notif) => (
                    <MenuItem
                      key={notif.id}
                      onClick={() => {
                        setNotifMenu(null);
                        if (notif.type === 'match') {
                          navigate('/matches');
                        } else if (notif.type === 'message') {
                          navigate('/matches');
                        }
                      }}
                      sx={{
                        borderLeft: notif.read ? 'none' : '3px solid #FE4655',
                        bgcolor: notif.read ? 'transparent' : 'rgba(254, 70, 85, 0.05)'
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: notif.read ? 400 : 600 }}>
                          {notif.translatedMessage || notif.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {notif.time}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))
                )}
                <Divider />
                <MenuItem onClick={() => { 
                  setNotifMenu(null);
                  navigate('/notifications');
                }}>
                  <Typography variant="body2" color="primary" align="center" sx={{ width: '100%' }}>
                    {t('dashboard.viewAll')}
                  </Typography>
                </MenuItem>
              </Menu>

              {/* Avatar e Menu */}
              <IconButton onClick={handleProfileMenu} size="small">
                <Avatar sx={{ width: 40, height: 40, bgcolor: '#FE4655' }}>
                  {user?.firstName?.charAt(0)}
                </Avatar>
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <MenuItem onClick={() => { navigate('/profile'); setAnchorEl(null); }}>
                  <ListItemIcon><Person fontSize="small" /></ListItemIcon>
                  <ListItemText primary={t('dashboard.profile')} />
                </MenuItem>
                <MenuItem onClick={() => { navigate('/profile'); setAnchorEl(null); }}>
                  <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
                  <ListItemText primary={t('dashboard.settings')} />
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => { logout(); setAnchorEl(null); }}>
                  <ListItemIcon><Person fontSize="small" /></ListItemIcon>
                  <ListItemText primary={t('dashboard.logout')} />
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* Welcome Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              {t('dashboard.welcome')}, {user?.firstName}! 👋
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {user?.userType === 'candidate' ? t('dashboard.candidateSubtitle') : t('dashboard.companySubtitle')}
            </Typography>
            {user?.userType === 'company' && !loading && (
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip 
                  icon={<TrendingUp />} 
                  label={`${stats.activeJobs} ${t('dashboard.activeJobs')}`} 
                  color="primary" 
                />
                <Chip 
                  icon={<Favorite />} 
                  label={`${stats.matches} ${t('dashboard.matchesCount')}`} 
                  color="secondary" 
                />
                <Chip 
                  icon={<People />} 
                  label={`${stats.candidates} ${t('dashboard.candidates')}`} 
                />
              </Box>
            )}
          </Box>

          {/* Cards */}
          <Grid container spacing={3}>
            {user?.userType === 'candidate' ? (
              <>
                <Grid item xs={12} md={6}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                      }
                    }} 
                    onClick={() => navigate('/swipe')}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ 
                        width: 64, 
                        height: 64, 
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2
                      }}>
                        <WorkOutline sx={{ fontSize: 32, color: 'white' }} />
                      </Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                        {t('dashboard.exploreJobs')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t('dashboard.exploreDesc')}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                      }
                    }} 
                    onClick={() => navigate('/matches')}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ 
                        width: 64, 
                        height: 64, 
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2
                      }}>
                        <Favorite sx={{ fontSize: 32, color: 'white' }} />
                      </Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                        {t('dashboard.matches')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t('dashboard.matchesDesc')}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} md={4}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                      }
                    }} 
                    onClick={() => navigate('/swipe')}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ 
                        width: 64, 
                        height: 64, 
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2
                      }}>
                        <People sx={{ fontSize: 32, color: 'white' }} />
                      </Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                        {t('dashboard.evaluateCandidates')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t('dashboard.evaluateDesc')}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                      }
                    }} 
                    onClick={() => navigate('/matches')}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ 
                        width: 64, 
                        height: 64, 
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2
                      }}>
                        <Favorite sx={{ fontSize: 32, color: 'white' }} />
                      </Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                        {t('dashboard.matches')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t('dashboard.companyMatches')}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                      }
                    }} 
                    onClick={() => navigate('/profile')}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ 
                        width: 64, 
                        height: 64, 
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2
                      }}>
                        <BusinessCenter sx={{ fontSize: 32, color: 'white' }} />
                      </Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                        {t('dashboard.myJobs')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t('dashboard.myJobsDesc')}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Dashboard;

