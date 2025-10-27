import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  CircularProgress
} from '@mui/material';
import { Close, Favorite, ArrowBack } from '@mui/icons-material';
import axios from 'axios';

function Swipe() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('/jobs');
      setJobs(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setLoading(false);
    }
  };

  const handleSwipe = async (direction) => {
    const liked = direction === 'right';
    const currentJob = jobs[currentIndex];
    
    if (!currentJob) return;

    setSwipeDirection(direction);
    
    try {
      await axios.post('/matches/swipe', {
        jobId: currentJob.id,
        liked
      });

      // Aguarda animação antes de mudar de card
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setSwipeDirection(null);
      }, 300);
    } catch (error) {
      console.error('Error swiping:', error);
      setSwipeDirection(null);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (currentIndex >= jobs.length) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Não há mais vagas disponíveis 😢
          </Typography>
          <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>
            Voltar ao início
          </Button>
        </Box>
      </Container>
    );
  }

  const currentJob = jobs[currentIndex];

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 2 }}>
        <IconButton onClick={() => navigate('/')} sx={{ mb: 2 }}>
          <ArrowBack />
        </IconButton>

        <Box sx={{ position: 'relative', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card 
            sx={{ 
              height: '580px', 
              borderRadius: 3,
              width: '100%',
              transition: 'transform 0.3s ease-out',
              transform: swipeDirection === 'left' ? 'translateX(-100vw) rotate(-10deg)' : 
                        swipeDirection === 'right' ? 'translateX(100vw) rotate(10deg)' : 'none',
              opacity: swipeDirection ? 0 : 1
            }}
          >
            <Box
              sx={{
                height: '400px',
                background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%), url(https://images.unsplash.com/photo-1497215842964-222b430dc094?w=500)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'flex-end',
                borderRadius: '16px 16px 0 0'
              }}
            >
              <Box sx={{ p: 3, color: 'white', width: '100%' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {currentJob.title}
                </Typography>
                <Typography variant="body1">
                  {currentJob.companyName}
                </Typography>
              </Box>
            </Box>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                💰 {currentJob.salary || 'A combinar'}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                📍 {currentJob.location || 'Não especificado'}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                💼 {currentJob.workMode || 'Presencial'}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                {currentJob.description?.substring(0, 150)}...
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#ff4458',
              minWidth: '60px',
              height: '60px',
              borderRadius: '50%',
              '&:hover': { bgcolor: '#ff3347' }
            }}
            onClick={() => handleSwipe('left')}
            disabled={!!swipeDirection}
          >
            <Close />
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#4caf50',
              minWidth: '60px',
              height: '60px',
              borderRadius: '50%',
              '&:hover': { bgcolor: '#45a049' }
            }}
            onClick={() => handleSwipe('right')}
            disabled={!!swipeDirection}
          >
            <Favorite />
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Swipe;

