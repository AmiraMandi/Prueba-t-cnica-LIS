// src/pages/Step3.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getColors } from '../services/api';
import { Container, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import Grid2 from '@mui/material/Grid2';

const Step3 = () => {
  const [colors, setColors] = useState([]);
  const selectedSubcategory = JSON.parse(localStorage.getItem('selectedSubcategory'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedSubcategory) {
      navigate('/step2');
      return;
    }

    const fetchColors = async () => {
      try {
        const data = await getColors(selectedSubcategory.id);
        setColors(data);
      } catch (error) {
        console.error('Error fetching colors:', error);
      }
    };

    fetchColors();
  }, [selectedSubcategory, navigate]);

  const handleColorSelect = (color) => {
    localStorage.setItem('selectedColor', JSON.stringify({ id: color.id }));
    navigate('/step4');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Selecciona un Color
      </Typography>
      <Grid2 container spacing={3}>
        {colors.map((color) => (
          <Grid2 item xs={12} sm={6} md={4} key={color.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/300" // Imagen placeholder, cámbiala si lo deseas
                alt={color.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {color.name}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<PaletteIcon />}
                  fullWidth
                  onClick={() => handleColorSelect(color)}
                  sx={{ mt: 2 }}
                >
                  Seleccionar
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default Step3;
