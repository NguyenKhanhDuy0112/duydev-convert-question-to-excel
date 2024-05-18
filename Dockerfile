# Build container (builder stage)
FROM node:21.2.0 as builder

WORKDIR /app

COPY package.json yarn.lock ./

COPY . .

COPY ./public /app/public
RUN cd /app && \
    mv src/configs/index.ts.tmpl src/configs/index.ts && \
    yarn install 

# Install envsub
RUN yarn global add envsub

RUN yarn build 

# Production container (nginx stage)
FROM nginx:1.23.3-alpine as production

# Set NODE_ENV to production
ENV NODE_ENV production

# Install curl, envsubst, and node
RUN apk add --no-cache curl gettext
RUN apk add --update nodejs npm

COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /usr/local/bin/envsub /usr/local/bin/envsub
COPY run.sh /app/run.sh
RUN chmod +x /app/run.sh
CMD ["/app/run.sh"]