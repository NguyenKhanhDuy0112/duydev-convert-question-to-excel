#!/bin/sh
sudo docker kill coupon_web_portal
sudo docker rm coupon_web_portal

sudo docker build -t coupon_web_portal .

sudo docker run -d --network home-net -p 3101:80 --name coupon_web_portal coupon_web_portal
