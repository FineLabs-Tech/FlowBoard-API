# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files dulu (biar layer caching efektif)
COPY package*.json ./

RUN npm install --production

# Copy sisa source code
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]