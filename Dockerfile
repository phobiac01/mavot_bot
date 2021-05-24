FROM node:12

WORKDIR /nodeApp

COPY ./bot_api/package*.json ./

RUN ["npm", "i"]

COPY ./bot_api .
COPY ./media ./media

ENV PRODUCTION=true

CMD ["npm", "start"]