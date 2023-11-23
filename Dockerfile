FROM node:18.13-alpine3.17 as build

WORKDIR /CalendarLib

RUN npm install -g @angular/cli

COPY /package.json .
COPY /package-lock.json .
RUN npm install

COPY . .
RUN ng build

CMD ng serve --host 0.0.0.0 --port 4200
