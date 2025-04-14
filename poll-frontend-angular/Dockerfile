FROM node:23 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:alpine
COPY --from=build /usr/src/app/dist/poll-frontend-angular/browser /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT  [ "/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/environment.template.js > /usr/share/nginx/html/environment.js && exec nginx -g 'daemon off;'" ]