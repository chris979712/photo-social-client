FROM node:22.14

RUN apt-get update && apt-get install -y git

WORKDIR /app/backend

RUN git clone https://github.com/chris979712/photo-social-backend.git 

WORKDIR /app/backend/photo-social-backend/app
RUN npm install

WORKDIR /app/cliente
RUN npm install

EXPOSE 12345

CMD ["npm", "start"]