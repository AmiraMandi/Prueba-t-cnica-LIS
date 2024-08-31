// src/pages/Step1.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../services/api';
import { Container, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import LanguageSwitcher from '../components/LanguageSwitcher'; // Importa el selector de idioma
import { useTranslation } from 'react-i18next';

const Step1 = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Establecer el idioma al cargar según lo guardado en localStorage
    const savedLanguage = localStorage.getItem('language') || 'es';  // Idioma por defecto: español
    i18n.changeLanguage(savedLanguage);

    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [i18n]);

  const handleCategorySelect = (category) => {
    localStorage.setItem('selectedCategory', JSON.stringify(category));
    navigate('/step2');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
     <Typography variant="h4" gutterBottom>
        {t('selectCategory')}
      </Typography>
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {t(`categories.${category.name.toLowerCase()}`, { defaultValue: category.name })}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleCategorySelect(category)}
                  sx={{ mt: 2 }}
                  startIcon={<CategoryIcon />}
                >
                  {t('select')}
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
