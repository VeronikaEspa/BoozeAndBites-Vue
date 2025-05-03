# Etapa de build
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Etapa de producción con Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Añadir configuración personalizada de Nginx para Vite/SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80