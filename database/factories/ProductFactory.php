<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            //
            'name_product' => $this->faker->sentence(2),
            'reference' => $this->faker->sentence(1),
            'price' => $this->faker->randomElement([500, 1000, 1500, 2000, 3000, 3500, 4000]),
            'weight' => $this->faker->randomElement([0.5, 7.5, 10, 12.5, 15]),
            'category_id' => $this->faker->randomElement([1, 2, 3, 4]),
            'stock' => $this->faker->randomElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
            'creation_date' => $this->faker->date('Y-m-d'),
        ];
    }
}
