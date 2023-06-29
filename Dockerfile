FROM node:20-alpine

WORKDIR /app

RUN apk update && apk add git

EXPOSE 3000

CMD ["npm", "start"]