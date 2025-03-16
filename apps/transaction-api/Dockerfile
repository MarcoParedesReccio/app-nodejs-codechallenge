FROM node:20 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx nx build transaction-api

FROM node:20-slim

WORKDIR /app

COPY --from=builder /app/dist/apps/transaction-api /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/

EXPOSE 3000

CMD ["node", "/app/dist/main.js"]
