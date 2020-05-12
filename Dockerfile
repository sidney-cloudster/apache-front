FROM debian:9
  
RUN apt update && apt-get install -y  lsb-release apt-transport-https ca-certificates \
    apache2 wget curl vim git ssh

RUN mkdir -p /var/www/multiloja && chmod -R 755 /var/www/multiloja && chown -R www-data.www-data /var/www/multiloja && rm /etc/apache2/sites-enabled/* \
        && a2enmod proxy proxy_http reflector rewrite http2 headers expires env request

ADD viamarketplace.com.br.conf /etc/apache2/sites-enabled/

WORKDIR /var/www/multiloja

COPY site site

RUN ls -l

RUN chmod -R 755 ./site && chown -R www-data.www-data ./site

RUN apt clean

CMD apachectl -D FOREGROUND