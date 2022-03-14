# ビルド環境
FROM node:lts as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env.production .env
RUN npm run build

# 本番環境
FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY Docker/nginx.conf /etc/nginx/nginx.conf
