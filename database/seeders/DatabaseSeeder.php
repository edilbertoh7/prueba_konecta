<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'usuario',
            'email' => 'usuario@usuario.com',
            'password' => bcrypt('user'),
        ]);


       
        $categiries = new CategoriesTableSeeder();
        $categiries->run();
        
        Product::factory(10)->create();
        $productsales = new ProductsalesTableSeeder();
        $productsales->run();

        
    }
}
