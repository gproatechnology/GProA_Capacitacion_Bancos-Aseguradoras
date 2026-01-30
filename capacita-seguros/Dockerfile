# Dockerfile para el Frontend de GProA - Capacitación Bancos y Aseguradoras
# Usamos imagen ligera de Node.js Alpine

FROM node:18-alpine

# Definir directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json primero para caché de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente
COPY . .

# Exponer el puerto de Vite (puerto 5173 por defecto)
EXPOSE 5173

# Comando para ejecutar el servidor de desarrollo de Vite
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
