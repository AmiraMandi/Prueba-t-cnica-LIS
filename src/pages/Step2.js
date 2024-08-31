// src/pages/Step2.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSubcategories } from '../services/api';
import { Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Step2 = () => {
  const [subcategories, setSubcategories] = useState([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'es';
    i18n.changeLanguage(savedLanguage);  // Aplicar el idioma guardado

    const selectedCategory = JSON.parse(localStorage.getItem('selectedCategory'));
    if (!selectedCategory) {
      navigate('/step1');
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
  }, [i18n, navigate]);

  const handleSubcategorySelect = (subcategory) => {
    localStorage.setItem('selectedSubcategory', JSON.stringify(subcategory));
    navigate('/step3');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t('selectSubcategory')}
      </Typography>
      <Grid container spacing={3}>
        {subcategories.map((subcategory) => (
          <Grid item xs={12} sm={6} md={4} key={subcategory.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {t(`subcategories.${subcategory.name.toLowerCase()}`, { defaultValue: subcategory.name })}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleSubcategorySelect(subcategory)}
                  sx={{ mt: 2 }}
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

export default Step2;
