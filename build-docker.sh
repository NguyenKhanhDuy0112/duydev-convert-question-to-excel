#!/bin/sh
sudo docker kill coupon_web_portal
sudo docker rm coupon_web_portal

sudo docker build -t coupon_web_portal --build-arg ENV_BUILD_WIDGET -f .

sudo docker run -d --network k2hitech-net -p 3100:80 --name coupon_web_portal coupon_web_portal
