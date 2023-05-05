<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('productsales', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id')->comment('id del producto');
            $table->unsignedBigInteger('sale_id')->comment('id de la venta');
            $table->unsignedBigInteger('quantity')->comment('cantidad de productos');
            $table->unsignedBigInteger('price')->comment('precio del producto');
            $table->unsignedBigInteger('total')->comment('total de la venta');
            $table->foreign('product_id')->references('id')->on('products');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('productsales');
    }
};
