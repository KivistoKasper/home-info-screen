FROM node:24 AS builder

WORKDIR /app/frontend

# Copy package files
COPY package*.json ./

# Install all dependencies including devDependencies
RUN npm ci

# Install dependencies needed to work in linux
RUN npm install

# Copy the rest of your code
COPY . .

# Build the frontend
RUN npm run build

# --- Serve using nginx ---
FROM nginx:alpine

# Copy built frontend
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]