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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name_product')->comment( 'nombre del producto' );
            $table->string('reference')->comment('referencia del producto');
            $table->unsignedBigInteger('price')->comment('precio del producto');
            $table->float('weight')->comment('peso del producto');
            $table->unsignedBigInteger('category_id')->comment('id de la categoria');
            $table->unsignedBigInteger('stock',)->comment('stock del producto');
            $table->date('creation_date')->comment('fecha de creacion del producto');
            $table->timestamps();
            $table->foreign('category_id')->references('id')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
