# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run docker-prod

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# build prod
# FROM node:lts-alpine as build-prod
# WORKDIR /app
# COPY package*.json ./
# RUN npm install --production
# COPY . .
# RUN npm run docker-prod

# production prod
# FROM nginx:stable-alpine as production-prod
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 81
# CMD ["nginx", "-g", "daemon off;"]