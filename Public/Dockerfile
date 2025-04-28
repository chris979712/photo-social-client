FROM node:22.14

RUN apt-get update && apt-get install -y git

WORKDIR /usr/src/public

COPY package*.json ./

COPY . .

RUN npm install

CMD ["npm","start"]