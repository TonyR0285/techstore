# TechStore 🛒

**Evaluación Final — Construcción de Software**  
Universidad Continental | Mg. Waldyr Fredy Cerron Valverde

---

## Descripción

Tienda web de artículos tecnológicos construida con diseño centrado en el usuario (UCD), pruebas unitarias TDD, control de versiones Git y despliegue con Docker.

---

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Base de datos | MySQL 8.0 |
| Pruebas | Jest + Supertest |
| Contenedores | Docker + Docker Compose |
| Proxy | Nginx |

---

## Estructura del proyecto

```
techstore/
├── frontend/          ← React + Vite
│   ├── Dockerfile
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
├── backend/           ← Node.js + Express
│   ├── Dockerfile
│   └── src/
│       ├── routes/
│       ├── controllers/
│       ├── models/
│       └── tests/     ← Pruebas TDD con Jest
├── database/
│   └── init.sql       ← Script inicial MySQL
├── docker-compose.yml
└── README.md
```

---

## Requisitos

- Docker Desktop instalado
- Git 2.x+

---

## Ejecutar el proyecto

```bash
# 1. Clonar el repositorio
git clone https://github.com/<tu-usuario>/techstore.git
cd techstore

# 2. Levantar todos los servicios
docker compose up --build

# 3. Acceder a la aplicación
# Frontend:  http://localhost
# Backend:   http://localhost:3000
# MySQL:     localhost:3307
```

---

## Ejecutar pruebas unitarias

```bash
# Dentro del contenedor backend
docker exec techstore_backend npm test

# Con cobertura
docker exec techstore_backend npm run test:coverage
```

---

## Ramas Git

| Rama | Propósito |
|------|-----------|
| `main` | Código estable para producción |
| `develop` | Integración de features |
| `feature/product-service` | CRUD y validaciones de productos |
| `feature/cart-service` | Lógica del carrito |
| `feature/docker-setup` | Configuración Docker |
| `feature/unit-tests` | Pruebas unitarias TDD |

---

## Integrante

- [Ramos Escobar Crist Antony] — Backend / Pruebas
- [Ramos Escobar Crist Antony] — Frontend / UI
- [Ramos Escobar Crist Antony] — DevOps / Docker
