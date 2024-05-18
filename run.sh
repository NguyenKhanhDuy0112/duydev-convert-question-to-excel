#!/bin/sh
# Replace placeholders with environment variables
envsubst < /app/.env > /app/.env.tmp
mv /app/.env.tmp /app/.env
# Start Nginx
nginx -g 'daemon off;'

echo "Webapp started"
