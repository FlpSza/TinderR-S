import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { WorkOutline, People, Favorite } from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Logo Pequeno Estilo Tinder */}
            <Box sx={{ position: 'relative', width: 48, height: 48 }}>
              {/* Círculo esquerdo */}
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
              {/* Círculo direito */}
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
              {/* Texto */}
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
          <Box>
            <Button onClick={() => navigate('/profile')} sx={{ mr: 2 }}>
              Perfil
            </Button>
            <Button onClick={logout} variant="outlined">
              Sair
            </Button>
          </Box>
        </Box>

        <Typography variant="h5" gutterBottom>
          Olá, {user?.firstName}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {user?.userType === 'candidate' 
            ? 'Procure oportunidades incríveis de trabalho' 
            : 'Encontre os melhores talentos para sua empresa'}
        </Typography>

        <Grid container spacing={3}>
          {user?.userType === 'candidate' ? (
            <>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/swipe')}>
                  <CardContent>
                    <WorkOutline sx={{ fontSize: 50, color: '#ff4458', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Explorar Vagas
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Deslize para encontrar vagas perfeitas para você
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/matches')}>
                  <CardContent>
                    <Favorite sx={{ fontSize: 50, color: '#ff4458', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Matches
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Veja suas conexões com empresas
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/swipe')}>
                  <CardContent>
                    <People sx={{ fontSize: 50, color: '#ff4458', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Avaliar Candidatos
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Encontre talentos para suas vagas
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/matches')}>
                  <CardContent>
                    <Favorite sx={{ fontSize: 50, color: '#ff4458', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Matches
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Veja seus matches com candidatos
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/profile')}>
                  <CardContent>
                    <WorkOutline sx={{ fontSize: 50, color: '#ff4458', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Minhas Vagas
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Gerencie suas vagas de emprego
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

export default Dashboard;

