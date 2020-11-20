FROM node:12

WORKDIR /nodeApp

COPY package*.json ./

RUN ["npm", "i"]

COPY . .

CMD ["npm", "start"]