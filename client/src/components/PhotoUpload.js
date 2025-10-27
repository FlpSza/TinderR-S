import React, { useState, useEffect } from 'react';
import { Box, Avatar, IconButton, Tooltip, Typography } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import axios from 'axios';

function PhotoUpload({ currentPhoto, onPhotoUpload, label = "Foto de perfil" }) {
  const [preview, setPreview] = useState(currentPhoto);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setPreview(currentPhoto);
  }, [currentPhoto]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Verificar tamanho (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Arquivo muito grande! Máximo 5MB');
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Upload
    setUploading(true);
    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await axios.post('/upload/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      onPhotoUpload(response.data.url);
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Erro ao fazer upload da foto');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <Avatar
          src={preview}
          sx={{ 
            width: 120, 
            height: 120,
            border: '3px solid #FE4655',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          {!preview && '?'}
        </Avatar>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="photo-upload"
          type="file"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <label htmlFor="photo-upload">
          <Tooltip title={label}>
            <IconButton
              component="span"
              disabled={uploading}
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                bgcolor: '#FE4655',
                color: 'white',
                '&:hover': { bgcolor: '#FF5A6C' },
                '&:disabled': { bgcolor: '#ccc' }
              }}
            >
              <PhotoCamera />
            </IconButton>
          </Tooltip>
        </label>
      </Box>
      {uploading && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
          Enviando...
        </Typography>
      )}
    </Box>
  );
}

export default PhotoUpload;
