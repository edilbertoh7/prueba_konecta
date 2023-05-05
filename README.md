# IMPORTANTE

# Instalar las depedencias de composer
comando
composer install

se debe tener crear una base de vacia en mysql con el nombre de `prueba-konect`
con la siguiente sentencia
CREATE DATABASE `prueba-konecta`

## Ejecutar migraciones y seeder
para que se cree la base de datos y se inserten los datos por defecto
 php artisan migrate:fresh --seed

## usuario por defecto
 email: usuario@usuario.com
 password: user


## Consulta para mostrar el producto con mas stock
SELECT p.name_product, p.reference, p.stock FROM products p
WHERE p.stock = (SELECT MAX(stock) FROM products)
ORDER BY p.stock DESC;

## Consulta para mostrar el producto mas vendido Producto mas vendido
SELECT p.name_product, p.reference, SUM(ps.quantity) AS quantity, ps.product_id FROM productsales ps
INNER JOIN products p ON(p.id = ps.product_id)
GROUP BY ps.product_id LIMIT 1



