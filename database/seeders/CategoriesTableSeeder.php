<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $category1 = new Category();
        $category1->category_name="Bebidas no gaseosas";
        $category1->description="Bebidas sin contenido de gas";
        $category1->save();

        $category2 = new Category();
        $category2->category_name="Bebidas gaseosas";
        $category2->description="Bebidas con contenido de gas";
        $category2->save();

        $category3 = new Category();
        $category3->category_name="Galleteria";
        $category3->description="Galletas de diferentes tipos";
        $category3->save();

        $category4 = new Category();
        $category4->category_name="Reposteria";
        $category4->description="Postres y tortas";
        $category4->save();
    }
}
