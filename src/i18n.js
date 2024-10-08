import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


const resources = {
  en: {
    translation: {
      selectCategory: 'Select a Category',
      selectSubcategory: 'Select a Subcategory',
      selectColor: 'Select a Color',
      recommendedProducts: 'Recommended Products',
      select: 'Select',
      price: 'Price',
      freeShipping: 'Free Shipping',
      rating: 'Rating',
      stock: 'Stock',
      filters: {
        maxPrice: 'Max Price',
        freeShipping: 'Free Shipping',
        sortBy: 'Sort By',
        priceAsc: 'Price Ascending',
        priceDesc: 'Price Descending',
        rating: 'Rating',
      },
      categories: {
        electronica: 'Electronics',
        ropa: 'Clothing',
        hogar: 'Home',
        deportes: 'Sports',
      },
      subcategories: {
        movil: 'Mobile',
        portatiles: 'Laptops',
        camaras_digitales: 'Digital Cameras',
        auriculares_bluetooth: 'Bluetooth Headphones',
      },
      colors: {
        negro: 'Black',
        plateado: 'Silver',
        azul: 'Blue',
        oro_rosa: 'Rose Gold',
       
      },
    },
  },
  es: {
    translation: {
      selectCategory: 'Selecciona una Categoría',
      selectSubcategory: 'Selecciona una Subcategoría',
      selectColor: 'Selecciona un Color',
      recommendedProducts: 'Productos Recomendados',
      select: 'Seleccionar',
      price: 'Precio',
      freeShipping: 'Envío Gratuito',
      rating: 'Valoración',
      stock: 'Stock',
      filters: {
        maxPrice: 'Precio Máximo',
        freeShipping: 'Envío Gratuito',
        sortBy: 'Ordenar por',
        priceAsc: 'Precio Ascendente',
        priceDesc: 'Precio Descendente',
        rating: 'Valoración',
      },
      categories: {
        electronica: 'Electrónica',
        ropa: 'Ropa',
        hogar: 'Hogar',
        deportes: 'Deportes',
      },
      subcategories: {
        movil: 'Móvil',
        portatiles: 'Portátiles',
        camaras_digitales: 'Cámaras Digitales',
        auriculares_bluetooth: 'Auriculares Bluetooth',
      },
      colors: {
        negro: 'Negro',
        plateado: 'Plateado',
        azul: 'Azul',
        oro_rosa: 'Oro Rosa',
       
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'es', 
  fallbackLng: 'es', 
  interpolation: {
    escapeValue: false, 
  },
});

export default i18n;
