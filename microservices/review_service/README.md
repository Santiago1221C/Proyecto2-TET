# Review Service

Microservicio para gestión de reseñas y calificaciones de libros.

## Características

- **Gestión de reseñas**: CRUD completo de reseñas
- **Sistema de calificación**: Rating de 1 a 5 estrellas
- **Estadísticas**: Cálculo de promedio y distribución de ratings
- **RabbitMQ**: Notificaciones asíncronas de eventos
- **Validación**: Previene reseñas duplicadas por usuario
- **Contador de utilidad**: Los usuarios pueden marcar reseñas como útiles

## Tecnologías

- Python 3.11
- Flask
- MongoDB
- RabbitMQ (pika)
- PyJWT

## Endpoints

### Reviews
- `POST /api/reviews` - Crear nueva reseña
- `GET /api/reviews/{id}` - Obtener reseña por ID
- `GET /api/reviews/book/{book_id}` - Obtener reseñas de un libro
- `GET /api/reviews/user/{user_id}` - Obtener reseñas de un usuario
- `PUT /api/reviews/{id}` - Actualizar reseña
- `DELETE /api/reviews/{id}` - Eliminar reseña
- `POST /api/reviews/{id}/helpful` - Marcar reseña como útil
- `GET /api/reviews/book/{book_id}/stats` - Obtener estadísticas de rating

### Health
- `GET /api/health` - Health check
- `GET /api/health/live` - Liveness probe
- `GET /api/health/ready` - Readiness probe

## Variables de Entorno

```bash
FLASK_ENV=development
PORT=5002
SERVICE_NAME=review-service

# RabbitMQ
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
RABBITMQ_USER=guest
RABBITMQ_PASS=guest

# MongoDB
MONGO_URI=mongodb://localhost:27017/
MONGO_DB=review_db

# Security
JWT_SECRET=your-secret-key
```

## Ejecución Local

```bash
# Instalar dependencias
pip install -r requirements.txt

# Ejecutar servicio
cd src
python app.py
```

## Docker

```bash
# Construir imagen
docker build -t review-service:latest .

# Ejecutar contenedor
docker run -p 5002:5002 \
  -e RABBITMQ_HOST=rabbitmq \
  -e MONGO_URI=mongodb://mongo:27017/ \
  review-service:latest
```

## Comunicación

- **REST API**: Para operaciones CRUD síncronas
- **RabbitMQ**: Para notificaciones asíncronas de eventos de reseñas
  - `review.created` - Nueva reseña creada
  - `review.updated` - Reseña actualizada
  - `review.deleted` - Reseña eliminada

## Estructura de Datos

```json
{
  "review_id": "uuid",
  "book_id": "string",
  "user_id": "string",
  "rating": 5,
  "title": "Excelente libro",
  "comment": "Muy recomendado...",
  "verified_purchase": true,
  "helpful_count": 10,
  "status": "active",
  "created_at": "2024-01-01T00:00:00",
  "updated_at": "2024-01-01T00:00:00"
}
```



