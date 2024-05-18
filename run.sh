#!/bin/sh

echo "Regenerate Application Configuration"

#Handle static host file
# INDEX_FILE=$(ls ./build/index.html)
# echo $INDEX_FILE
# envsub --syntax handlebars $INDEX_FILE $INDEX_FILE
env | sort

# Replace env by envsub in all bundle file
for f in ./build/static/js/* ; do envsub --syntax handlebars "$f" "$f" ; done

apk --no-cache add curl

#Handle nginx default config
NGINX_CONF_FILE=$(ls /etc/nginx/conf.d/default.conf)
echo $NGINX_CONF_FILE
envsub --syntax handlebars $NGINX_CONF_FILE $NGINX_CONF_FILE

#Handle React static HTMLs

# echo $FILE
# STATIC_ARTIFACT=./build/bundle.js
# echo $STATIC_ARTIFACT
# envsub --syntax handlebars $STATIC_ARTIFACT $STATIC_ARTIFACT

echo "Run application"
nginx -t
nginx -g "daemon off;"

echo "Webapp started"
