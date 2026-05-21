# Proyecto Final - Backend de Adopciones 🐾

## Descripción
Backend desarrollado en Node.js para la gestión de adopciones de mascotas. Incluye API RESTful, documentación Swagger, tests funcionales, integración con Docker y despliegue de imagen en DockerHub.

---

## 🚀 Instalación y uso local

1. Clona el repositorio:
   ```sh
   git clone https://github.com/MaximilianoSulsenti/backend-3-Sulsenti.git
   cd backend-3-Sulsenti
   ```

2. Instala dependencias:
   ```sh
   npm install
   ```

3. Configura las variables de entorno:
   - Crea un archivo `.env` con:
     ```
     MONGODB_URI=mongodb+srv://...
     MONGODB_URI_TEST=mongodb+srv://...
     ```

4. Ejecuta la aplicación:
   ```sh
   npm start
   ```
   La API estará disponible en: http://localhost:8080

---

## 🐳 Uso con Docker

```sh
docker pull maxisulsenti/backend-final:latest

docker run -p 8080:8080 --env-file .env \
maxisulsenti/backend-final:latest
```

---

## 📖 Documentación Swagger

La documentación interactiva está disponible en:  
http://localhost:8080/api/docs

---

## 🧪 Tests

Para ejecutar los tests funcionales:
```sh
npm test
```
Evidencia de pruebas y cobertura en Google Docs (ver sección “Entrega”).

---

## 📦 Endpoints principales

- `GET /api/adoptions` — Listar adopciones
- `GET /api/adoptions/:aid` — Obtener adopción por ID
- `POST /api/adoptions/:uid/:pid` — Crear adopción
- `PUT /api/adoptions/:aid` — Actualizar adopción
- `DELETE /api/adoptions/:aid` — Eliminar adopción

---

## 🛡️ Seguridad

La imagen Docker fue escaneada en DockerHub.  
Ver sección de vulnerabilidades en DockerHub o evidencia en Google Docs.

---

## 🛠 Tecnologías usadas

- Node.js
- Express
- MongoDB (Mongoose)
- Docker
- Jest / Supertest
- Swagger

---

## 🐳 Imagen en DockerHub

[https://hub.docker.com/repository/docker/maxisulsenti/backend-final](https://hub.docker.com/repository/docker/maxisulsenti/backend-final)

---

## 📄 Entrega y documentación

- Repositorio: [https://github.com/MaximilianoSulsenti/backend-3-Sulsenti.git](https://github.com/MaximilianoSulsenti/backend-3-Sulsenti.git)
- Imagen Docker: [https://hub.docker.com/repository/docker/maxisulsenti/backend-final](https://hub.docker.com/repository/docker/maxisulsenti/backend-final)
- Evidencia de pruebas y escaneo: Ver Google Docs entregado ([https://docs.google.com/document/d/1A7wsuMtXbhTAtE0p1OjzvPmrg8_AvuA-fkWiYhKMAEk/edit?usp=sharing](https://docs.google.com/document/d/1A7wsuMtXbhTAtE0p1OjzvPmrg8_AvuA-fkWiYhKMAEk/edit?usp=sharing))

---
