# Recomendador de Productos

Este proyecto es una aplicación de recomendación de productos desarrollada con React. Permite a los usuarios seleccionar una categoría, subcategoría y color, y luego muestra productos recomendados basados en sus elecciones. La aplicación incluye filtros de búsqueda y clasificación para mejorar la experiencia del usuario.

## 🛠 Tecnologías Utilizadas

- **React**: Biblioteca de JavaScript para la construcción de interfaces de usuario.
- **Material-UI (MUI)**: Librería de componentes de UI para React.
- **i18next**: Framework internacionalización de JavaScript para manejar múltiples idiomas.
- **API**: La aplicación consume una API externa para obtener categorías, subcategorías, colores y productos.

## 🚀 Funcionalidades

1. **Selector de Categorías (Step 1):** El usuario puede seleccionar una categoría de una lista proporcionada.
2. **Selector de Subcategorías (Step 2):** Basado en la categoría seleccionada, el usuario puede elegir una subcategoría.
3. **Selector de Colores (Step 3):** Basado en la subcategoría seleccionada, el usuario puede elegir un color.
4. **Recomendador de Productos (Step 4):** Se muestra una lista de productos recomendados basada en las selecciones previas del usuario. La lista de productos incluye:
   - Información del producto (nombre, precio, valoración, stock, envío gratuito).
   - Filtros de búsqueda por precio y envío gratuito.
   - Clasificación por precio ascendente, precio descendente y valoración.
   - Botón de compra "Comprar Ahora".

## 🌐 Internacionalización

El proyecto soporta múltiples idiomas (Español e Inglés) utilizando `i18next`. El usuario puede cambiar el idioma utilizando un selector de idioma en la interfaz.

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

## ⚙️ Instalación

Sigue estos pasos para instalar y ejecutar el proyecto en tu entorno local:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/AmiraMandi/Prueba-t-cnica-LIS
