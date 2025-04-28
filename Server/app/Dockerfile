FROM node:22.14

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm install nodemon

EXPOSE 5000

CMD ["npm", "start"]