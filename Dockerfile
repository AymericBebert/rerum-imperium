FROM node:22.17.1-bookworm-slim AS builder

WORKDIR /rerum-imperium

COPY package.json package-lock.json ./
RUN npm ci
COPY . .

RUN npm run build

#
# Go back from a light nginx image
#
FROM nginx:1.29.0-alpine

# nginx congiguration to redirect every route to /index.html
RUN echo $'\n\
server {\n\
  listen       80;\n\
  server_name  localhost;\n\
  root /usr/share/nginx/html;\n\
  try_files $uri $uri/ /index.html;\n\
  # GZIP\n\
  gzip on;\n\
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/x-icon application/vnd.ms-fontobject font/opentype application/x-font-ttf;\n\
  # Media: images, icons, video, audio, HTC\n\
  location ~* \.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc)$ {\n\
    expires 1M;\n\
    access_log off;\n\
    add_header Cache-Control "public";\n\
  }\n\
  # CSS and Javascript\n\
  location ~* \.(?:css|js)$ {\n\
    expires 1y;\n\
    access_log off;\n\
    add_header Cache-Control "public";\n\
  }\n\
}' > /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
COPY docker-entrypoint.sh /docker-entrypoint.sh
COPY --from=builder /rerum-imperium/dist/rerum-imperium/browser .
EXPOSE 80

ARG APP_VERSION
RUN echo $APP_VERSION > /version.txt

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
