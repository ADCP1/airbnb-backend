FROM node:16.14.2-alpine3.15

WORKDIR /app

RUN apk update && apk add curl

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 8080
ENV PORT=8080

RUN npm run build

CMD ["npm", "start"]
