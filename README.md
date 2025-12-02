# Movie Explorer App

Aplicación web desarrollada en React y TypeScript que consume la API de OMDb para buscar y visualizar películas y series. Permite filtrar por tipo y año, guardar favoritos, consultar historial de búsquedas y ver detalles de cada película en un modal.

## Tecnologías

- React 18 + TypeScript
- Vite
- TailwindCSS
- Framer Motion (animaciones)
- Hooks personalizados para manejo de favoritos, historial y películas
- API: [OMDb](http://www.omdbapi.com/)

## Requisitos

- Node.js v18+ recomendado
- npm o yarn

## Instalación

1. Clonar el repositorio:

git clone <URL_DEL_REPOSITORIO>
cd movie-explorer-app

2. Instalar dependencias:

npm install

# o

yarn

3. Crear un archivo .env en la raíz del proyecto con tu API Key de OMDb:

VITE_OMDB_API_KEY=tu_api_key_aquí

Puedes obtener la API Key gratuita en: http://www.omdbapi.com/apikey.aspx
Ejecución local

Para iniciar la aplicación en modo desarrollo:

npm run dev

# o

yarn dev

La aplicación estará disponible en http://localhost:5173 (o puerto que indique Vite).
Scripts disponibles

    dev - Ejecuta la aplicación en modo desarrollo con hot reload

    build - Genera los archivos de producción en la carpeta dist

    preview - Sirve la build de producción localmente para pruebas

Estructura del proyecto

    src/components - Componentes reutilizables (MovieCard, MovieModal, SearchBar, etc.)

    src/pages - Páginas principales (Home, Favorites)

    src/hooks - Hooks personalizados (useMovies, useFavorites, useHistory)

    src/assets - Imágenes estáticas y placeholder

    src/App.tsx - Componente raíz

    src/main.tsx - Punto de entrada de la aplicación

Funcionalidades

    Búsqueda de películas y series

    Filtrado por tipo y año

    Modal con detalles de cada película

    Guardado y eliminación de favoritos

    Historial de búsquedas recientes

    Skeleton loading mientras carga la información

    Animaciones y micro-interacciones con Framer Motion

    Responsive en desktop y mobile

Notas

    Asegúrate de que tu API Key esté activa y correctamente configurada en .env.

    Si la API falla o no encuentra datos, se muestran mensajes amigables al usuario.

```

```
