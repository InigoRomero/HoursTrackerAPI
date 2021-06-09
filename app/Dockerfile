FROM node:14

COPY /app/package.json .

RUN npm install

COPY /app .

RUN mkdir /app

WORKDIR /app
