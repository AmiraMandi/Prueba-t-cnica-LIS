// src/pages/Step1.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../services/api';
import { Container, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import Grid from '@mui/material/Grid'; // Cambia la importación a Grid

const Step1 = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (category) => {
    localStorage.setItem('selectedCategory', JSON.stringify({ id: category.id }));
    navigate('/step2');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Selecciona una Categoría
      </Typography>
      <Grid container spacing={3}> {/* Usa `container` como booleano */}
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}> {/* Usa `item` como booleano */}
            <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/300"
                alt={category.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {category.name}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<CategoryIcon />}
                  fullWidth
                  onClick={() => handleCategorySelect(category)}
                  sx={{ mt: 2 }}
                >
                  Seleccionar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Step1;
