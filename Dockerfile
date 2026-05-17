# Imagen base liviana de Node.js
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar solo archivos de dependencias primero
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm install --production

# Copiar el resto del código de la app
COPY . .

# Exponer el puerto de la app
EXPOSE 8080

# Comando para iniciar la app
CMD ["node", "src/app.js"]
