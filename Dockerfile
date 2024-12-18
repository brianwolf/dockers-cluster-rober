FROM nginx:alpine

COPY data.json /usr/share/nginx/html
COPY index.html /usr/share/nginx/html
COPY script.js /usr/share/nginx/html
COPY styles.css /usr/share/nginx/html

