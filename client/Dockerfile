# Base

FROM node:18-alpine AS base

# Build

FROM base AS build

WORKDIR /app

COPY . .

RUN npm i
RUN npm run build

# Nginx

FROM nginx:latest AS nginx

COPY --from=build /app/dist/mathmixin /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
