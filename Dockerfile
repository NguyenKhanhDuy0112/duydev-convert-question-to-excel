FROM alpine:3.11 as preInit
WORKDIR /app
ARG ENV_BUILD_WIDGET
RUN echo -e "${ENV_BUILD_WIDGET}" > .env
RUN cat .env

# Stage 1: Build the application
FROM node:21.2.0-alpine as builder

WORKDIR /app

# Copy package.json and yarn.lock separately to leverage Docker cache
COPY package.json yarn.lock ./

COPY --chown=node yarn.lock ./
COPY --chown=node . .

# Set NODE_OPTIONS for memory control during the build
# ENV NODE_OPTIONS="--max-old-space-size=2048"

# Install dependencies
RUN yarn install

# Copy the rest of the application source code
COPY . .

# **Crucial change: Copy the .env file from preInit stage**
COPY --from=preInit /app/.env /app/.env

# Build the application
RUN yarn run build

# Stage 2: Production image with Nginx
FROM nginx:1.23.3-alpine as production

# Set NODE_ENV to production
ENV NODE_ENV production

# Use nginx:1.17.9-alpine as base image
FROM nginx:1.17.9-alpine

# Install nodejs, npm and yarn
RUN apk add --no-cache nodejs npm yarn

# Install envsub
RUN yarn global add envsub

WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/build /app/build
COPY run.sh /app

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod +x run.sh && \
    mkdir -p /etc/nginx/logs/ && \
    touch /etc/nginx/logs/static.log

RUN nginx -t

# Expose port 80
EXPOSE 80

# Run Nginx in the foreground
CMD [ "./run.sh" ]