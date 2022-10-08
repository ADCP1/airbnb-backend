FROM node:16.14.2

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 8080
ENV PORT=8080

RUN npm run build

CMD ["npm", "start"]
