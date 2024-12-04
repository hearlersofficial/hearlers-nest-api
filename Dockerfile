FROM node:20.11.0

WORKDIR /usr/src/app

COPY package.json ./

EXPOSE 50051