FROM node:18-buster

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY index.js /app/index.js
COPY models /app/models

EXPOSE 4000

CMD ["npm", "start"]