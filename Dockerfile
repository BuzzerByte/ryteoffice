FROM php:7.4-fpm-alpine

WORKDIR /var/www/html

RUN set -ex \
  && apk --no-cache add \
    postgresql-dev
# Install Postgre PDO
RUN docker-php-ext-install pdo pdo_mysql bcmath pdo_pgsql pgsql