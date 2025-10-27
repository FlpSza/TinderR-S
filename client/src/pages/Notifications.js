import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  IconButton,
  Avatar,
  Divider,
  Chip,
  CircularProgress
} from '@mui/material';
import { ArrowBack, Language, Notifications as NotificationsIcon } from '@mui/icons-material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from '../i18n';

function Notifications() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllNotifications();
  }, []);

  const fetchAllNotifications = async () => {
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
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = (notif) => {
    if (notif.type === 'match' || notif.type === 'message') {
      navigate('/matches');
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'match':
        return '💕';
      case 'message':
        return '💬';
      case 'application':
        return '📄';
      default:
        return '🔔';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'match':
        return '#f093fb';
      case 'message':
        return '#667eea';
      case 'application':
        return '#4facfe';
      default:
        return '#95a5a6';
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Container maxWidth="md">
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
              <IconButton onClick={() => navigate('/')}>
                <ArrowBack />
              </IconButton>
              <NotificationsIcon sx={{ fontSize: 32, color: '#FE4655' }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {t('dashboard.notifications')}
              </Typography>
            </Box>
          </Box>

          {/* Notifications List */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : notifications.length === 0 ? (
            <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 3 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {t('dashboard.noNotifications')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {language === 'pt-BR' ? 'Você não tem notificações no momento' : 'You have no notifications at the moment'}
              </Typography>
            </Paper>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {notifications.map((notif) => (
                <Paper
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    borderLeft: notif.read ? 'none' : '4px solid',
                    borderLeftColor: getNotificationColor(notif.type),
                    bgcolor: notif.read ? 'white' : 'rgba(254, 70, 85, 0.05)',
                    '&:hover': {
                      transform: 'translateX(4px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: getNotificationColor(notif.type),
                        width: 48,
                        height: 48
                      }}
                    >
                      {getNotificationIcon(notif.type)}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: notif.read ? 400 : 600 }}>
                          {notif.translatedMessage || notif.message}
                        </Typography>
                        {!notif.read && (
                          <Chip 
                            label={language === 'pt-BR' ? 'Nova' : 'New'} 
                            size="small" 
                            sx={{ 
                              bgcolor: '#FE4655', 
                              color: 'white',
                              fontSize: '0.7rem',
                              height: 20
                            }} 
                          />
                        )}
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {notif.time}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default Notifications;

