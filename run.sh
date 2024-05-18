#!/bin/sh

echo "Regenerate Application Configuration"

echo "Environment Variables in Container:"
env | sort

# Inject environment variables using a tool like `sed` (replace with your preferred tool):
sed -i "s/REACT_APP_API_BO_ENDPOINT=.*$/REACT_APP_API_BO_ENDPOINT=${REACT_APP_API_BO_ENDPOINT}/g" ./build/static/js/*.js

# Run Nginx
nginx -t
nginx -g "daemon off;"

echo "Webapp started"