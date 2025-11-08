# Bookstore Frontend

Frontend de React con React-Bootstrap para la tienda de libros.

## Características

- **React 18**: Última versión de React
- **React-Bootstrap**: Componentes UI modernos
- **React Router**: Navegación SPA
- **Vite**: Build tool rápido
- **Responsive Design**: Adaptable a todos los dispositivos
- **Integración completa**: Conecta con todos los microservicios

## Tecnologías

- React 18.2.0
- React-Bootstrap 2.9.1
- React Router DOM 6.20.0
- Axios (HTTP Client)
- Vite (Build Tool)
- Nginx (Production Server)

## Páginas

- **Home**: Página principal con libros destacados
- **Books**: Catálogo completo con filtros y búsqueda
- **BookDetail**: Detalles del libro con reseñas
- **Cart**: Carrito de compras
- **Checkout**: Proceso de pago
- **Login/Register**: Autenticación de usuarios
- **Profile**: Perfil del usuario y historial
- **MyReviews**: Gestión de reseñas del usuario

## Funcionalidades

### Gestión de Usuarios
- Registro e inicio de sesión
- Perfil de usuario
- Actualización de información personal
- Historial de pagos

### Catálogo de Libros
- Navegación por categorías
- Búsqueda por título y autor
- Filtros avanzados
- Detalles completos de cada libro

### Carrito de Compras
- Agregar/eliminar productos
- Actualizar cantidades
- Cálculo automático de totales
- Persistencia en localStorage

### Sistema de Reseñas
- Escribir reseñas y calificaciones
- Ver reseñas de otros usuarios
- Marcar reseñas como útiles
- Gestionar tus propias reseñas

### Procesamiento de Pagos
- Validación de tarjetas
- Simulación de pasarela de pagos
- Confirmación de pedidos

## Servicios Integrados

El frontend se comunica con los siguientes microservicios:

### User Service (Puerto 8080)
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login
- `GET /api/users/me` - Perfil actual
- `PUT /api/users/{id}` - Actualizar perfil

### Payment Service (Puerto 5000)
- `POST /api/payments` - Procesar pago
- `GET /api/payments/{id}` - Estado de pago
- `GET /api/payments/user/{userId}` - Historial
- `POST /api/payments/validate` - Validar método de pago

### Review Service (Puerto 5002)
- `POST /api/reviews` - Crear reseña
- `GET /api/reviews/book/{bookId}` - Reseñas de libro
- `GET /api/reviews/user/{userId}` - Reseñas de usuario
- `GET /api/reviews/book/{bookId}/stats` - Estadísticas
- `DELETE /api/reviews/{id}` - Eliminar reseña

## Variables de Entorno

Crear archivo `.env` basado en `.env.example`:

```bash
VITE_API_BASE_URL=http://localhost
```

## Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:3000
```

## Producción

### Build

```bash
# Generar build de producción
npm run build

# Preview del build
npm run preview
```

### Docker

```bash
# Construir imagen
docker build -t bookstore-frontend:latest .

# Ejecutar contenedor
docker run -p 80:80 bookstore-frontend:latest
```

La aplicación estará disponible en http://localhost

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── BookCard.jsx
│   └── ReviewCard.jsx
├── pages/              # Páginas principales
│   ├── Home.jsx
│   ├── Books.jsx
│   ├── BookDetail.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Profile.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   └── MyReviews.jsx
├── services/           # API clients
│   ├── userService.js
│   ├── paymentService.js
│   └── reviewService.js
├── context/            # React Context
│   ├── AuthContext.jsx
│   └── CartContext.jsx
├── config/             # Configuración
│   └── api.js
├── data/               # Datos mock
│   └── booksData.js
├── styles/             # Estilos globales
│   └── global.css
├── App.jsx            # Componente principal
└── main.jsx           # Punto de entrada
```

## Características Destacadas

### Estado Global
- **AuthContext**: Gestión de autenticación
- **CartContext**: Gestión del carrito

### Persistencia
- LocalStorage para carrito
- LocalStorage para sesión de usuario

### Responsive Design
- Mobile-first approach
- Bootstrap grid system
- Componentes adaptativos

### UX/UI
- Loading states
- Error handling
- Success messages
- Form validation
- Smooth transitions

## Testing

```bash
# Run tests (cuando estén implementados)
npm test
```

## Deployment

El frontend se puede desplegar en:
- Nginx (producción)
- Netlify
- Vercel
- AWS S3 + CloudFront
- GitHub Pages

## Notas

- Los datos de libros son mock data para demostración
- El sistema de pagos es simulado
- Se requiere que los microservicios estén corriendo



