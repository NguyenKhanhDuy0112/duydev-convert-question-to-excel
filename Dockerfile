# => Build container
FROM node:21.2.0 as builder

WORKDIR /app

COPY package.json yarn.lock ./

COPY . .

COPY ./public /app/public

RUN cd /app && \
    mv src/configs/index.ts.tmpl src/configs/index.ts && \
    yarn install 

RUN yarn build 

# => Production container
FROM nginx:1.23.3-alpine as production

# Set NODE_ENV to production
ENV NODE_ENV production

# Install envsub
RUN apk add --no-cache nodejs yarn && yarn global add envsub

# Use envsub to replace environment variables in run.sh
COPY run.sh /app/run.sh
RUN envsub /app/run.sh

WORKDIR /app

COPY --from=builder /app/build /app/build

COPY run.sh /app

# Copy the built application from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod +x run.sh && \
    mkdir -p /etc/nginx/logs/ && \
    touch /etc/nginx/logs/static.log

EXPOSE 80

CMD [ "./run.sh" ]
