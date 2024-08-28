// src/services/api.js
const API_KEY = '65ea931b-a185-40f4-8c3c-033954e09705';
const BASE_URL = 'https://technicalproof.lisdatasolutions.com/api/v1/recommender';

// Función para obtener todas las categorías
export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/category`, {
      method: 'GET',
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener las categorías');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Función para obtener todas las subcategorías por ID de categoría
export const getSubcategories = async (categoryId) => {
  try {
    const response = await fetch(`${BASE_URL}/category/${categoryId}/subcategory`, {
      method: 'GET',
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener las subcategorías');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    throw error;
  }
};

// Función para obtener todos los colores por ID de subcategoría
export const getColors = async (subcategoryId) => {
  try {
    const response = await fetch(`${BASE_URL}/subcategory/${subcategoryId}/color`, {
      method: 'GET',
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los colores');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching colors:', error);
    throw error;
  }
};

// Función para obtener productos filtrados
export const getProducts = async (filters) => {
  const { category, subcategory, color } = filters;

  if (!category || !subcategory || !color) {
    console.error('Faltan parámetros requeridos para obtener productos');
    return [];
  }

  const queryParams = new URLSearchParams({
    id_category: category,
    id_subcategory: subcategory,
    id_color: color,
  }).toString();

  try {
    const response = await fetch(`${BASE_URL}/product?${queryParams}`, {
      method: 'GET',
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Error al obtener los productos:', errorDetails);
      throw new Error(`Error al obtener los productos: ${JSON.stringify(errorDetails)}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
