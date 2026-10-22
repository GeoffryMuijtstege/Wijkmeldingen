#BUILDEN
FROM node:24-alpine AS build

WORKDIR /wijkmeldingen

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

#SERVEREN
FROM nginxinc/nginx-unprivileged:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /wijkmeldingen/dist/wijkmeldingen/browser /usr/share/nginx/html

EXPOSE 8080