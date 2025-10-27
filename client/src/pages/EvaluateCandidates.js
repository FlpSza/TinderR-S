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
  Chip,
  CircularProgress,
  Divider
} from '@mui/material';
import { Close, Favorite, ArrowBack } from '@mui/icons-material';
import axios from 'axios';
import { useTranslation } from '../i18n';

function EvaluateCandidates() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [candidates, setCandidates] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get('/matches/company/pending');
      setCandidates(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      setLoading(false);
    }
  };

  const handleSwipe = async (direction) => {
    const liked = direction === 'right';
    const currentCandidate = candidates[currentIndex];
    
    if (!currentCandidate) return;

    setSwipeDirection(direction);
    
    try {
      await axios.post('/matches/swipe', {
        jobId: currentCandidate.job.id,
        candidateId: currentCandidate.candidateId,
        liked
      });

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

  if (currentIndex >= candidates.length) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            {t('evaluate.noMoreCandidates')}
          </Typography>
          <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>
            {t('swipe.backToHome')}
          </Button>
        </Box>
      </Container>
    );
  }

  const currentCandidate = candidates[currentIndex].candidate;
  const currentJob = candidates[currentIndex].job;

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
                background: currentCandidate.photo 
                  ? `url(${currentCandidate.photo})`
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'flex-end',
                borderRadius: '16px 16px 0 0',
                p: 3
              }}
            >
              <Box sx={{ color: 'white', width: '100%' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {currentCandidate.firstName} {currentCandidate.lastName}
                </Typography>
                <Chip 
                  label={currentJob.title} 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.3)', 
                    color: 'white',
                    fontWeight: 'bold'
                  }} 
                />
              </Box>
            </Box>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#ff4458', fontWeight: 'bold' }}>
                {t('swipe.location')}: {currentCandidate.location || t('swipe.notSpecified')}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {currentCandidate.bio || t('evaluate.noBio')}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="caption" color="text.secondary">
                <strong>{t('evaluate.candidateFor')}:</strong> {currentJob.title}
              </Typography>
              {currentJob.location && (
                <Typography variant="caption" color="text.secondary" display="block">
                  <strong>{t('swipe.location')}:</strong> {currentJob.location}
                </Typography>
              )}
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

export default EvaluateCandidates;

