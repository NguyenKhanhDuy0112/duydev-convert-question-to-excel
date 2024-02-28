yarn install 

yarn add -g envsub

envsub --syntax handlebars ".env.tmpl" ".env"

vesion='$aNEXT_PUBLIC_BUILD_VERSION'=$(git rev-parse HEAD)
sed -i -e "$vesion" .env

yarn run build

yarn start