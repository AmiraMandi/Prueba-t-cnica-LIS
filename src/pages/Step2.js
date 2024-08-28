// src/pages/Step2.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSubcategories } from '../services/api';
import { Container, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import Grid from '@mui/material/Grid'; // Usa Grid en lugar de Grid2

const Step2 = () => {
  const [subcategories, setSubcategories] = useState([]);
  const selectedCategory = JSON.parse(localStorage.getItem('selectedCategory'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedCategory) {
      navigate('/');
      return;
    }

    const fetchSubcategories = async () => {
      try {
        const data = await getSubcategories(selectedCategory.id);
        setSubcategories(data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubcategories();
  }, [selectedCategory, navigate]);

  const handleSubcategorySelect = (subcategory) => {
    localStorage.setItem('selectedSubcategory', JSON.stringify({ id: subcategory.id }));
    navigate('/step3');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Selecciona una Subcategoría
      </Typography>
      <Grid container spacing={3}> {/* Usa `container` correctamente */}
        {subcategories.map((subcategory) => (
          <Grid item xs={12} sm={6} md={4} key={subcategory.id}> {/* Usa `item` correctamente */}
            <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/300"
                alt={subcategory.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {subcategory.name}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<SubdirectoryArrowRightIcon />}
                  fullWidth
                  onClick={() => handleSubcategorySelect(subcategory)}
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

export default Step2;
