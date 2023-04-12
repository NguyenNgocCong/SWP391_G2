FROM nginx:1.14.2-alpine as production-stage
FROM node:16.17.1 as build-stage
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build
FROM production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY site.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]