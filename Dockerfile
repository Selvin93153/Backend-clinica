# Usa una imagen oficial de Node.js
FROM node:18

# Crea el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compila el código TypeScript a JavaScript
RUN npm run build

# Expone el puerto en el que corre tu app
EXPOSE 4000

# Comando para iniciar tu backend en modo producción
CMD ["npm", "run", "start:prod"]
