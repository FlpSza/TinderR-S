import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  IconButton,
  Grid,
  CircularProgress
} from '@mui/material';
import { ArrowBack, Chat } from '@mui/icons-material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Matches() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await axios.get('/matches');
      setMatches(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching matches:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" sx={{ color: '#ff4458', fontWeight: 'bold' }}>
            Seus Matches 💕
          </Typography>
        </Box>

        {matches.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Ainda não há matches 😢
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Continue deslizando para encontrar matches!
            </Typography>
            <Button
              onClick={() => navigate('/swipe')}
              variant="contained"
              sx={{ mt: 3, bgcolor: '#ff4458' }}
            >
              Explorar vagas
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {matches.map((match) => (
              <Grid item xs={12} sm={6} md={4} key={match.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    {user?.userType === 'candidate' ? (
                      <>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar
                            src={match.job?.company?.photo}
                            sx={{ width: 56, height: 56, mr: 2 }}
                          >
                            {match.job?.companyName?.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="h6">
                              {match.job?.companyName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {match.job?.title}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          {match.job?.description?.substring(0, 100)}...
                        </Typography>
                        <Button
                          fullWidth
                          variant="contained"
                          startIcon={<Chat />}
                          onClick={() => navigate(`/chat/${match.id}`)}
                          sx={{ bgcolor: '#ff4458' }}
                        >
                          Conversar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar
                            src={match.candidate?.photo}
                            sx={{ width: 56, height: 56, mr: 2 }}
                          >
                            {match.candidate?.firstName?.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="h6">
                              {match.candidate?.firstName} {match.candidate?.lastName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {match.job?.title}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          {match.candidate?.bio || 'Sem descrição'}
                        </Typography>
                        <Button
                          fullWidth
                          variant="contained"
                          startIcon={<Chat />}
                          onClick={() => navigate(`/chat/${match.id}`)}
                          sx={{ bgcolor: '#ff4458' }}
                        >
                          Conversar
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}

export default Matches;

