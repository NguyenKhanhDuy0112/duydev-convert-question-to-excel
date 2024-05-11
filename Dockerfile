# Stage 1: Build the application
FROM node:21.2.0-alpine as builder

WORKDIR /app

# Copy package.json and yarn.lock separately to leverage Docker cache
COPY package.json .

COPY . .

COPY ./public /app/public

RUN cd /app && \
    mv src/constants/env.constant.ts.tmpl src/constants/env.constant.ts && \
    # mkdir -p node_modules/node-sass/vendor/linux-x64-72/ && \
    # wget -O node_modules/node-sass/vendor/linux-x64-72/binding.node https://github.com/sass/node-sass/releases/download/v4.13.0/linux-x64-72_binding.node  -v && \
    yarn install 

# Build the application
RUN yarn run build

# Stage 2: Production image with Nginx
FROM nginx:1.23.3-alpine as production

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