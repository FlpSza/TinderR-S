import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  MenuItem,
  IconButton,
  CircularProgress
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from '../i18n';

function JobCreate() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    salary: '',
    location: '',
    workMode: 'presential',
    requirements: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/jobs', formData);
      navigate('/profile');
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Erro ao criar vaga');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton onClick={() => navigate('/profile')} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" sx={{ color: '#ff4458', fontWeight: 'bold' }}>
            {t('profile.createJob')}
          </Typography>
        </Box>

        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <CardContent sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                name="title"
                label={t('jobCreate.title')}
                value={formData.title}
                onChange={handleChange}
                margin="normal"
                required
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              />

              <TextField
                fullWidth
                name="description"
                label={t('jobCreate.description')}
                multiline
                rows={6}
                value={formData.description}
                onChange={handleChange}
                margin="normal"
                required
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              />

              <TextField
                fullWidth
                name="salary"
                label={t('jobCreate.salary')}
                value={formData.salary}
                onChange={handleChange}
                margin="normal"
                placeholder={t('swipe.combine')}
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              />

              <TextField
                fullWidth
                name="location"
                label={t('profile.location')}
                value={formData.location}
                onChange={handleChange}
                margin="normal"
                required
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              />

              <TextField
                fullWidth
                select
                name="workMode"
                label={t('swipe.workMode')}
                value={formData.workMode}
                onChange={handleChange}
                margin="normal"
                required
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              >
                <MenuItem value="presential">{t('swipe.presential')}</MenuItem>
                <MenuItem value="remote">{t('swipe.remote')}</MenuItem>
                <MenuItem value="hybrid">{t('swipe.hybrid')}</MenuItem>
              </TextField>

              <TextField
                fullWidth
                name="requirements"
                label={t('jobCreate.requirements')}
                multiline
                rows={4}
                value={formData.requirements}
                onChange={handleChange}
                margin="normal"
                placeholder={t('jobCreate.requirementsPlaceholder')}
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              />

              <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => navigate('/profile')}
                  fullWidth
                  sx={{ 
                    borderRadius: 2,
                    py: 1.5,
                    borderColor: '#ff4458',
                    color: '#ff4458',
                    '&:hover': {
                      borderColor: '#ff3347',
                      bgcolor: 'rgba(255, 68, 88, 0.04)'
                    }
                  }}
                >
                  {t('profile.cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{ 
                    borderRadius: 2,
                    py: 1.5,
                    bgcolor: '#ff4458',
                    '&:hover': { bgcolor: '#ff3347' }
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : t('profile.save')}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default JobCreate;

