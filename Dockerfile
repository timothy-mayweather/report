FROM laravel
WORKDIR /app
COPY . .
RUN composer install --optimize-autoloader --no-dev
RUN php artisan config:cache
RUN php artisan event:cache
RUN php artisan route:cache
RUN php artisan view:cache
EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0"]
