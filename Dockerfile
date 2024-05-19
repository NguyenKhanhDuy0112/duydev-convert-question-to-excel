# Build container
FROM node:21.2.0 as react_build_base

ARG MOMO_AUTH_TOKEN

WORKDIR /app

COPY package.json yarn.lock ./

COPY . .

COPY ./public /app/public

RUN cd /app && \
    mv src/configs/index.ts.tmpl src/configs/index.ts && \
    yarn install 

RUN yarn build 

# Stage 2: Production image with Nginx
FROM nginx:1.23.3-alpine as production

# Install nodejs, npm and yarn
RUN apk add --no-cache nodejs npm yarn

# Install envsub
RUN yarn global add envsub

WORKDIR /app

COPY --from=react_build_base /app/build /app/build

COPY run.sh /app

# Nginx default config files
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

RUN chmod +x run.sh && \
    mkdir -p /etc/nginx/logs/ && \
    touch /etc/nginx/logs/static.log

RUN nginx -t

CMD [ "./run.sh" ]