// src/pages/Step4.js
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
} from '@mui/material';
import Grid2 from '@mui/material/Grid2';

const Step4 = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ price: '', freeShipping: false });
  const [sortOption, setSortOption] = useState('');

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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Productos Recomendados
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12}>
          <TextField
            label="Precio Máximo"
            type="number"
            name="price"
            value={filters.price}
            onChange={handleFilterChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="freeShipping"
                checked={filters.freeShipping}
                onChange={handleFilterChange}
              />
            }
            label="Envío Gratuito"
          />
          <Select
            value={sortOption}
            onChange={handleSortChange}
            displayEmpty
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          >
            <MenuItem value="" disabled>
              Ordenar por...
            </MenuItem>
            <MenuItem value="priceAsc">Precio Ascendente</MenuItem>
            <MenuItem value="priceDesc">Precio Descendente</MenuItem>
            <MenuItem value="rating">Valoración</MenuItem>
          </Select>
        </Grid2>
        {filteredAndSortedProducts.map((product) => (
          <Grid2 item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/300" // Imagen placeholder, cámbiala si lo deseas
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography>Precio: ${product.price}</Typography>
                <Typography>
                  Envío Gratuito: {product.is_free_shipping ? 'Sí' : 'No'}
                </Typography>
                <Typography>Valoración: {product.average_rating}</Typography>
                <Typography>Stock: {product.stock_quantity}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Ver Detalles
                </Button>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default Step4;
