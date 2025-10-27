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
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    userType: 'candidate'
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/auth/register', formData);
      login(response.data.token, response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao cadastrar');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 4 }}>
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
          
          <Typography variant="h6" gutterBottom align="center" sx={{ mb: 3, color: 'text.secondary', fontWeight: 400 }}>
            Crie sua conta
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nome"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Sobrenome"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Senha"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Tipo de usuário</InputLabel>
              <Select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                label="Tipo de usuário"
              >
                <MenuItem value="candidate">Candidato</MenuItem>
                <MenuItem value="company">Empresa</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#ff4458', '&:hover': { bgcolor: '#ff3347' } }}
            >
              Cadastrar
            </Button>
          </form>

          <Typography align="center">
            Já tem conta? <Link to="/login" style={{ color: '#ff4458' }}>Faça login</Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default Register;

