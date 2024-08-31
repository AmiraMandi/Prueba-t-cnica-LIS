import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  Grid,
  Drawer,
  Toolbar,
  List,
  ListItem,
  Divider,
  Box,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const getRandomImage = () => `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 100)}`;

const Step4 = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ price: '', freeShipping: false });
  const [sortOption, setSortOption] = useState('');
  const { t } = useTranslation(); // Importa la función de traducción

  useEffect(() => {
    const fetchProducts = async () => {
      const selectedCategory = JSON.parse(localStorage.getItem('selectedCategory'));
      const selectedSubcategory = JSON.parse(localStorage.getItem('selectedSubcategory'));
      const selectedColor = JSON.parse(localStorage.getItem('selectedColor'));

      if (!selectedCategory || !selectedSubcategory || !selectedColor) {
        console.error('Faltan datos necesarios para obtener los productos');
        return;
      }

      const filters = {
        category: selectedCategory.id,
        subcategory: selectedSubcategory.id,
        color: selectedColor.id,
      };

      try {
        const data = await getProducts(filters);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortProducts = (products) => {
    switch (sortOption) {
      case 'priceAsc':
        return [...products].sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return [...products].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...products].sort((a, b) => b.average_rating - a.average_rating);
      default:
        return products;
    }
  };

  const filteredAndSortedProducts = sortProducts(
    products.filter(
      (product) =>
        (filters.price === '' || product.price <= filters.price) &&
        (!filters.freeShipping || product.is_free_shipping)
    )
  );

  return (
    <Container disableGutters maxWidth="lg" sx={{ pt: 8, pb: 6, display: 'flex' }}>
      {/* Barra lateral de filtros */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            <ListItem>
              <TextField
                label={t('filters.maxPrice')} 
                type="number"
                name="price"
                value={filters.price}
                onChange={handleFilterChange}
                fullWidth
              />
            </ListItem>
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox
                    name="freeShipping"
                    checked={filters.freeShipping}
                    onChange={handleFilterChange}
                  />
                }
                label={t('filters.freeShipping')} 
              />
            </ListItem>
            <Divider />
            <ListItem>
              <Select
                value={sortOption}
                onChange={handleSortChange}
                displayEmpty
                fullWidth
              >
                <MenuItem value="" disabled>
                  {t('filters.sortBy')} {/* Traducción del texto */}
                </MenuItem>
                <MenuItem value="priceAsc">{t('filters.priceAsc')}</MenuItem>
                <MenuItem value="priceDesc">{t('filters.priceDesc')}</MenuItem>
                <MenuItem value="rating">{t('filters.rating')}</MenuItem>
              </Select>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Contenedor de productos */}
      <Container maxWidth="lg" component="main" sx={{ flexGrow: 1 }}>
        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
          {t('recommendedProducts')} {/* Traducción del título */}
        </Typography>
        <Grid container spacing={4} alignItems="flex-end">
          {filteredAndSortedProducts.map((product) => (
            <Grid
              item
              key={product.id}
              xs={12}
              sm={6}
              md={4}
            >
              <Card>
                <CardMedia
                  component="img"
                  height="180"
                  image={getRandomImage()} // Usa una imagen aleatoria
                  alt={product.name}
                />
                <CardContent>
                  <Typography component="h2" variant="h6" color="text.primary" gutterBottom>
                    {t(`subcategories.${product.name.toLowerCase().replace(/ /g, '_')}`, { defaultValue: product.name })}
                  </Typography>
                  <Typography component="h3" variant="h5" color="text.primary">
                    {t('price')}: ${product.price}
                  </Typography>
                  <ul>
                    <Typography component="li" variant="subtitle2" align="center">
                      {t('stock')}: {product.stock_quantity}
                    </Typography>
                    <Typography component="li" variant="subtitle2" align="center">
                      {t('rating')}: {product.average_rating}
                    </Typography>
                    <Typography component="li" variant="subtitle2" align="center">
                      {t('freeShipping')}: {product.is_free_shipping ? t('yes') : t('no')}
                    </Typography>
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained" color="primary">
                    {t('select')}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
};

export default Step4;
