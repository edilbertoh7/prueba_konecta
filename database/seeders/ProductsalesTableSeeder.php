<?php

namespace Database\Seeders;

use App\Models\Productsale;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductsalesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $productsale1 = new Productsale();
        $productsale1->product_id = 1;
        $productsale1->sale_id = 1;
        $productsale1->quantity = 2;
        $productsale1->price = 5000;
        $productsale1->total = 10000;
        $productsale1->save();

        $productsale2 = new Productsale();
        $productsale2->product_id = 4;
        $productsale2->sale_id = 2;
        $productsale2->quantity = 3;
        $productsale2->price = 6000;
        $productsale2->total = 18000;
        $productsale2->save();

        $productsale3 = new Productsale();
        $productsale3->product_id = 5;
        $productsale3->sale_id = 3;
        $productsale3->quantity = 1;
        $productsale3->price = 6500;
        $productsale3->total = 6500;
        $productsale3->save();

        $productsale14 = new Productsale();
        $productsale14->product_id = 6;
        $productsale14->sale_id = 4;
        $productsale14->quantity = 4;
        $productsale14->price = 5500;
        $productsale14->total = 22000;
        $productsale14->save();
    }
}
