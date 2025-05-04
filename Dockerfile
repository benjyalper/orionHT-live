# 1) Build the Vite app
FROM node:18-alpine AS builder
WORKDIR /app

# Copy in package files and install everything
COPY package.json package-lock.json ./
RUN npm install

# Copy source and build front-end
COPY . .
RUN npm run build

# 2) Prepare production image
FROM node:18-alpine AS production
WORKDIR /app

# Copy only production dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy built front-end from builder
COPY --from=builder /app/dist ./dist

# Copy your Express server code
COPY server.js ./

# If you need dotenv locally, you can optionally copy .env (but don't commit it)
# COPY .env .env

# Make sure server.js uses something like:
#   app.use(express.static(path.join(process.cwd(), 'dist')));

EXPOSE 8080

# Start the Express server, which will serve both /api and the static files.
CMD ["node", "server.js"]
