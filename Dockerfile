# Use Node.js 18 Alpine image
FROM node:18-alpine

# Create app directory inside the container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the whole app
COPY . .

# Build the Vite app
RUN npm run build

# Install serve globally to serve the built app
RUN npm install -g serve

# Serve the app from the dist folder
CMD ["serve", "-s", "dist", "-l", "8080"]
