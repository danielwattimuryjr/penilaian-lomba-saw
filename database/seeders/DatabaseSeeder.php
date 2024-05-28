<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'ADMIN',
            'username' => 'its_admin',
            'email' => 'admin@mail.com',
            'password' => 'password'
        ]);
    }
}
