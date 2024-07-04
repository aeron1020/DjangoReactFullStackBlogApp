# FROM nginx:1.19.0-alpine

# COPY ./default.conf /etc/nginx/conf.d/default.conf


# nginx/Dockerfile

FROM nginx:1.22-alpine

# Remove the default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom nginx configuration
COPY ./default.conf /etc/nginx/conf.d/default.conf

