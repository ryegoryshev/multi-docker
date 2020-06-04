FROM node:13.12.0-alpine as build-stage

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install
RUN npm install react-scripts@3.4.1 -g

COPY ./ ./

RUN npm run build

FROM nginx
EXPOSE 3000 
COPY --from=build-stage ./app/build/ /usr/share/nginx/html
COPY --from=build-stage ./app/nginx/default.conf /etc/nginx/conf.d/default.conf
