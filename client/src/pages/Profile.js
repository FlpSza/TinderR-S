import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Avatar,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { ArrowBack, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Profile() {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [editDialog, setEditDialog] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchProfile();
    if (user?.userType === 'company') {
      fetchJobs();
    }
  }, [user?.userType]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/users/me');
      setProfile(response.data);
      setEditData(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get('/jobs/company/my-jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put('/users/me', editData);
      setProfile(response.data);
      login(localStorage.getItem('token'), response.data);
      setEditDialog(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Tem certeza que deseja deletar esta vaga?')) {
      try {
        await axios.delete(`/jobs/${jobId}`);
        fetchJobs();
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  if (!profile) {
    return <div>Carregando...</div>;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" sx={{ color: '#ff4458', fontWeight: 'bold' }}>
            Meu Perfil
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Avatar
                    src={profile.photo}
                    sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                  >
                    {profile.firstName?.charAt(0)}
                  </Avatar>
                  <Typography variant="h5">
                    {profile.firstName} {profile.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {profile.email}
                  </Typography>
                  <Button
                    startIcon={<Edit />}
                    onClick={() => setEditDialog(true)}
                    sx={{ mt: 2 }}
                  >
                    Editar Perfil
                  </Button>
                </Box>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Bio:</strong> {profile.bio || 'Não informado'}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Localização:</strong> {profile.location || 'Não informado'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Tipo:</strong> {profile.userType === 'candidate' ? 'Candidato' : 'Empresa'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            {user?.userType === 'company' && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Minhas Vagas</Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/job/create')}
                    sx={{ bgcolor: '#ff4458' }}
                  >
                    Criar Vaga
                  </Button>
                </Box>

                {jobs.length === 0 ? (
                  <Typography color="text.secondary">
                    Nenhuma vaga criada ainda
                  </Typography>
                ) : (
                  <Grid container spacing={2}>
                    {jobs.map((job) => (
                      <Grid item xs={12} key={job.id}>
                        <Card>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Box>
                                <Typography variant="h6">{job.title}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {job.description.substring(0, 100)}...
                                </Typography>
                              </Box>
                              <IconButton
                                color="error"
                                onClick={() => handleDeleteJob(job.id)}
                              >
                                <Delete />
                              </IconButton>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </Grid>

        {/* Edit Dialog */}
        <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Editar Perfil</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Nome"
              value={editData.firstName || ''}
              onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Sobrenome"
              value={editData.lastName || ''}
              onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Bio"
              multiline
              rows={3}
              value={editData.bio || ''}
              onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Localização"
              value={editData.location || ''}
              onChange={(e) => setEditData({ ...editData, location: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Telefone"
              value={editData.phone || ''}
              onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialog(false)}>Cancelar</Button>
            <Button onClick={handleUpdateProfile} variant="contained" sx={{ bgcolor: '#ff4458' }}>
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}

export default Profile;

