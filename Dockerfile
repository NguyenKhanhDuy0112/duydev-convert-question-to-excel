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
FROM nginx:1.17.9-alpine

# Install envsub
RUN apk add --no-cache nodejs yarn && yarn global add envsub

# Use envsub to replace environment variables in run.sh
COPY run.sh /app/run.sh
RUN envsub /app/run.sh

WORKDIR /app

COPY --from=builder /app/build /app/build

COPY run.sh /app

COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/default.conf /etc/nginx/conf.d/default.conf

RUN chmod +x run.sh && \
    mkdir -p /etc/nginx/logs/ && \
    touch /etc/nginx/logs/static.log

RUN nginx -t

CMD [ "./run.sh" ]
