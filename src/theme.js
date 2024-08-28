// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Color principal
    },
    secondary: {
      main: '#ff4081', // Color secundario
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none', // Evita que los botones usen mayúsculas por defecto
    },
  },
});

export default theme;
