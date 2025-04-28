FROM node:22.14

RUN apt-get update && apt-get install -y git

WORKDIR /app/cliente

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 12345

CMD ["npm", "start"]