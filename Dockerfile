# Stage 1: Build the application
FROM node:21.2.0 as builder

WORKDIR /app

# Copy package.json and yarn.lock separately to leverage Docker cache
COPY package.json yarn.lock ./

# Set NODE_OPTIONS for memory control during the build
ENV NODE_OPTIONS="--max-old-space-size=1024"

# Install dependencies
RUN yarn install

# Copy the rest of the application source code
COPY . .

# Build the application
RUN yarn run build

# Stage 2: Production image with Nginx
FROM nginx:1.23.3-alpine as production

# Set NODE_ENV to production
ENV NODE_ENV production

# Copy the built application from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
