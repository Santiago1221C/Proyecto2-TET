<<<<<<< HEAD
# User Service

Microservicio para gestión de usuarios en la arquitectura de tienda de libros.

## Características

- **Autenticación JWT**: Sistema de autenticación basado en tokens
- **Gestión de usuarios**: CRUD completo de usuarios
- **Control de acceso**: Roles y permisos
- **Perfiles de usuario**: Información detallada de clientes
- **Spring Boot**: Framework Java empresarial
- **PostgreSQL**: Base de datos relacional

## Tecnologías

- Java 17
- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- JWT (JSON Web Tokens)
- PostgreSQL
- Maven

## Endpoints

### Authentication
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/validate` - Validar token JWT

### Users
- `GET /api/users/me` - Obtener usuario actual
- `GET /api/users/{id}` - Obtener usuario por ID
- `GET /api/users` - Listar todos los usuarios (Admin)
- `PUT /api/users/{id}` - Actualizar usuario
- `DELETE /api/users/{id}` - Eliminar usuario (Admin)
- `POST /api/users/{id}/activate` - Activar usuario (Admin)
- `POST /api/users/{id}/deactivate` - Desactivar usuario (Admin)

### Health
- `GET /api/health` - Health check
- `GET /api/health/live` - Liveness probe
- `GET /api/health/ready` - Readiness probe

## Variables de Entorno

```bash
DB_URL=jdbc:postgresql://localhost:5432/userdb
DB_USERNAME=postgres
DB_PASSWORD=postgres
JWT_SECRET=your-secret-key
```

## Ejecución Local

```bash
# Compilar
mvn clean install

# Ejecutar
mvn spring-boot:run

# Con perfil de desarrollo (H2)
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

## Docker

```bash
# Construir imagen
docker build -t user-service:latest .

# Ejecutar contenedor
docker run -p 8080:8080 \
  -e DB_URL=jdbc:postgresql://postgres:5432/userdb \
  -e DB_USERNAME=postgres \
  -e DB_PASSWORD=postgres \
  user-service:latest
```

## Comunicación

Este servicio utiliza **comunicación REST directa** (no RabbitMQ) para operaciones síncronas de autenticación y gestión de usuarios.



=======
<p align="center">
  <a href="https://codely.com">
    <img src="https://user-images.githubusercontent.com/10558907/170513882-a09eee57-7765-4ca4-b2dd-3c2e061fdad0.png" width="300px" height="92px" alt="Codely logo"/>
  </a>
</p>

<h1 align="center">
  💎 Kotlin HTTP API Skeleton
</h1>

<p align="center">
    <a href="https://github.com/CodelyTV/kotlin-api-skeleton/actions/workflows/ci.yml"><img src="https://github.com/CodelyTV/kotlin-api-skeleton/actions/workflows/ci.yml/badge.svg" alt="Build status"/></a>
    <a href="https://github.com/CodelyTV"><img src="https://img.shields.io/badge/CodelyTV-OS-green.svg?style=flat-square" alt="Codely Open Source"/></a>
    <a href="https://pro.codely.com"><img src="https://img.shields.io/badge/CodelyTV-PRO-black.svg?style=flat-square" alt="CodelyTV Courses"/></a>
</p>

<p align="center">
  Template intended to serve as a starting point if you want to <strong>bootstrap a Kotlin HTTP API</strong>.
  <br />
  <br />
  Take a look, play and have fun with this.
  <a href="https://github.com/CodelyTV/kotlin-api-skeleton/stargazers">Stars are welcome 😊</a>
</p>

This is a repository intended to serve as a starting point if you want to bootstrap an API in Kotlin.

## ☝️ Introduction

It could be useful if you want to start from scratch a kata or a little exercise or project. The idea is that you don't have to worry about the boilerplate
* Latest stable kotlin version
* Latest stable Springboot version
* Latest stable java version
* Best practices applied
* Some useful resources to start coding

## 🌎 How To Start

You could manually clone [this repo](https://github.com/CodelyTV/kotlin-api-skeleton) or just us it as a template

### Cloning the repository

We recommend to follow the next step by step process in order to avoid adding the bootstrap project commits to your project Git history:

1. [Use this repositoy template](https://github.com/CodelyTV/kotlin-api-skeleton/generate)
2. Clone your project
3. Move to the project directory: `cd your-project-name`
4. Build the project for the first time: `./gradlew build`
5. Run all the checks: `./gradlew check`. This will do some checks that you can perform with isolated commands:
    1. [Klint](https://ktlint.github.io/) using [Spotless](https://github.com/diffplug/spotless): `./gradlew spotlessCheck`. If you want to fix style issues automatically: `./gradlew spotlessApply`.
    2. [Kotlin test](https://kotlinlang.org/api/latest/kotlin.test/): `./gradlew test`.
6. To just run the project execute: `./gradlew run`
7. Start coding!

## 👌 Helpful resources

### Kotlin

* [Kotlin Coding Conventions](https://kotlinlang.org/docs/coding-conventions.html)
* [Comparison between Kotlin and Java](https://kotlinlang.org/docs/comparison-to-java.html)

### Kotlin test

* [Test code using JUnit in JVM - tutorial](https://kotlinlang.org/docs/jvm-test-using-junit.html)
* [JUnit5 assertions](https://junit.org/junit5/docs/5.0.1/api/org/junit/jupiter/api/Assertions.html)

## 👌 Codely Code Quality Standards

Publishing this package we are committing ourselves to the following code quality standards:

- 🤝 Respect **Semantic Versioning**: No breaking changes in patch or minor versions
- 🤏 No surprises in transitive dependencies: Use the **bare minimum dependencies** needed to meet the purpose
- 🎯 **One specific purpose** to meet without having to carry a bunch of unnecessary other utilities
- ✅ **Tests** as documentation and usage examples
- 📖 **Well documented ReadMe** showing how to install and use
- ⚖️ **License favoring Open Source** and collaboration

## 🔀 Related skeleton templates

Opinionated TypeScript skeletons ready for different purposes:

- [🔷🌱 TypeScript Basic Skeleton](https://github.com/CodelyTV/typescript-basic-skeleton)
- [🔷🕸️ TypeScript Web Skeleton](https://github.com/CodelyTV/typescript-web-skeleton)
- [🔷🌍 TypeScript API Skeleton](https://github.com/CodelyTV/typescript-api-skeleton)
- [🔷✨ TypeScript DDD Skeleton](https://github.com/CodelyTV/typescript-ddd-skeleton)

This very same basic skeleton philosophy implemented in other programming languages:

- [✨ JavaScript Basic Skeleton](https://github.com/CodelyTV/javascript-basic-skeleton)
- [☕ Java Basic Skeleton](https://github.com/CodelyTV/java-basic-skeleton)
- [📍 Kotlin Basic Skeleton](https://github.com/CodelyTV/kotlin-basic-skeleton)
- [🧬 Scala Basic Skeleton](https://github.com/CodelyTV/scala-basic-skeleton)
- [🦈 C# Basic Skeleton](https://github.com/CodelyTV/csharp-basic-skeleton)
- [🐘 PHP Basic Skeleton](https://github.com/CodelyTV/php-basic-skeleton)
>>>>>>> eaeffc425a5398e8958d7464d3c13f3a144a3988
