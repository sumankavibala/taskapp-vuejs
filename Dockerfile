# Stage 1: Build the Nuxt app
FROM node:20-alpine3.20 AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app and build
COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine3.20

WORKDIR /app

# Copy built app from builder
COPY --from=builder /app ./

# Install only production dependencies
COPY package*.json ./
RUN npm install --production

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
