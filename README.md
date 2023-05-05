# Instalar las depedencias de composer
composer install



## Ejecutar migraciones y seeder
#### php artisan migrate:fresh --seed

## usuario por defecto
 email: usuario@usuario.com
 password: user



##

## producto con mas stock
SELECT p.name_product, p.reference, p.stock FROM products p
WHERE p.stock = (SELECT MAX(stock) FROM products)
ORDER BY p.stock DESC;

## Producto mas vendido
SELECT p.name_product, p.reference, SUM(ps.quantity) AS quantity, ps.product_id FROM productsales ps
INNER JOIN products p ON(p.id = ps.product_id)
GROUP BY ps.product_id LIMIT 1

- **hola**

#### Code of Conduct


