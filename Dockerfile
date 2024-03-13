FROM node:21-alpine3.18

WORKDIR /usr/src/movie_api

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon


COPY . .

EXPOSE 3000

CMD ["nodemon", "./cmd/app.js"]