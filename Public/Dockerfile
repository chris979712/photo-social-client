FROM node:22.14

RUN apt-get update && apt-get install -y git

WORKDIR /usr/src

RUN git clone https://github.com/chris979712/photo-social-backend.git ./backend

WORKDIR /usr/src/backend

RUN npm install

WORKDIR /usr/src/cliente

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 12345

CMD ["npm","start"]