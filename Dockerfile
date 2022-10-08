FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 8080
ENV PORT=8080

USER node

CMD ["npm", "start"]
