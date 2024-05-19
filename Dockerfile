# Build container
FROM node:21.2.0 as react_build_base

ARG MOMO_AUTH_TOKEN

WORKDIR /app

COPY package.json yarn.lock ./

COPY . .

COPY ./public /app/public

RUN cd /app && \
    mv src/config/index.js.tmpl src/config/index.js && \
    yarn install 

RUN yarn build 

FROM asia.gcr.io/map-4ps-prod/nginx-envsub:1.17.9-alpine

WORKDIR /app

COPY --from=react_build_base /app/build /app/build

COPY run.sh /app

# Nginx default config files
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy Facebook Domain verification HTML file to root
COPY facebook_domain_verification/xnrkcafkhxs45kvmy1k96f4p7lut71.html /app/build/xnrkcafkhxs45kvmy1k96f4p7lut71.html

RUN chmod +x run.sh && \
    mkdir -p /etc/nginx/logs/ && \
    touch /etc/nginx/logs/static.log

RUN nginx -t

CMD [ "./run.sh" ]