FROM node:22.14

RUN apt-get update && apt-get install -y git

WORKDIR /usr/src/public

COPY package*.json ./

COPY . .

RUN git clone https://github.com/chris979712/photo-social-backend.git

RUN npm install

CMD ["dir"]
