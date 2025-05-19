# 1) Build the Vite app
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files & install all deps
COPY package.json package-lock.json ./
RUN npm install

# Copy everything & build
COPY . .
RUN npm run build

# 2) Prepare production image
FROM node:18-alpine AS production
WORKDIR /app

# Install only prod deps
COPY package.json package-lock.json ./
RUN npm install --production

# Copy built front-end and server code
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./server.js

EXPOSE 8080

# Run your combined front-end + API server
CMD ["node", "server.js"]
