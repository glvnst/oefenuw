FROM galvanist/vueenv:latest as builder
LABEL maintainer="Ben Burke <glvnst@users.noreply.github.com>"

COPY v1 /work

RUN npm install \
  && npm run build

FROM nginx:1-alpine as server
COPY --from=builder /work/dist/ /usr/share/nginx/html/
COPY nginx_conf.d/* /etc/nginx/conf.d/
