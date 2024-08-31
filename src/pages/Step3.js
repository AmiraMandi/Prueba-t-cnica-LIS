import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getColors } from '../services/api';
import { Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Step3 = () => {
  const [colors, setColors] = useState([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'es';
    i18n.changeLanguage(savedLanguage); 

    const selectedSubcategory = JSON.parse(localStorage.getItem('selectedSubcategory'));
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
  }, [i18n, navigate]);

  const handleColorSelect = (color) => {
    localStorage.setItem('selectedColor', JSON.stringify(color));
    navigate('/step4');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t('selectColor')}
      </Typography>
      <Grid container spacing={3}>
        {colors.map((color) => (
          <Grid item xs={12} sm={6} md={4} key={color.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {t(`colors.${color.name.toLowerCase()}`, { defaultValue: color.name })}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleColorSelect(color)}
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

export default Step3;
