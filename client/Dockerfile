# Base

FROM node:18-alpine AS base

# Dependencies

FROM base AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i

# Build

FROM base AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Nginx

FROM nginx:latest AS nginx

COPY --from=build /app/dist/mathmixin /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
