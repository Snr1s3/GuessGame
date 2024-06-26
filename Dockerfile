FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install express
COPY . .

EXPOSE 3007

CMD [ "node", "server.js" ]
