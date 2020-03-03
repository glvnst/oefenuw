FROM galvanist/vueenv:latest as builder
LABEL maintainer="Ben Burke <benjaminburke@me.com>"

COPY v1 /app

WORKDIR /app
RUN npm install \
  && npm run build

FROM nginx:1-alpine as server
COPY --from=builder /app/dist/ /usr/share/nginx/html/
COPY nginx_conf.d/* /etc/nginx/conf.d/
