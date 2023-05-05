# IMPORTANTE

# Instalar las depedencias de composer
comando
composer install
tambien es conveniente ejecutar npm install para instalar dependecias los modulos de node

se debe tener crear una base de vacia en mysql con el nombre de `prueba-konect`
con la siguiente sentencia
CREATE DATABASE `prueba-konecta`

## Ejecutar migraciones y seeder
para que se cree la base de datos y se inserten los datos por defecto
 php artisan migrate:fresh --seed
 
 ## ejecuta el proyecto 
 luego de tener instaladas las dependenciass y las migraciones se puede ejecutar el comando 
 php artisan serve para ejecutar el proyecto por defecto laravel corre en el puerto 8000
 
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

para visualizar el frondend es necesario ir hasta la rura konecta-front y estando dentro de la carpeta 
ejecutar npm install para instalar las dependencias y luego ejecutar npm run dev para correr la aplicacion 
la cual corre por defecto en el puerto 5173.
 es importante aclarar que el aplicativo front escucha en el puerto 8000 por lo cual si por algun motivo 
 al ejecutar la aplicacion de laravel este corre en un puerto diferente es necesario cambiar el puerto
 en el archivo endpoint.js que se encuentr dentro de la carpeta components para que haya comunicacion entre el frontend y backend



