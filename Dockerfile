FROM node:12

WORKDIR /nodeApp

COPY ./api-bot/package*.json .

RUN ["npm", "i"]

COPY ./api-bot/ .
COPY ./media media

ENV PRODUCTION=true

CMD ["npm", "start"]