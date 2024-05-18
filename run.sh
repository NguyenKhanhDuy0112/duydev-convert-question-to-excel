#!/bin/sh
# Replace placeholders in env.constant.ts with actual environment variables
sed -i "s/{{ REACT_APP_API_BO_ENDPOINT }}/$REACT_APP_API_BO_ENDPOINT/g" src/constants/env.constant.ts
# Start Nginx
nginx -g 'daemon off;'

echo "Webapp started"
