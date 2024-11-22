<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Petugas;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

         DB::table('petugas')->insert([
            'username' => 'test',
            'nama_petugas' => 'Mas Faiz',
            'role' => 'admin',
            'password' => Hash::make('123')
        ]);

        
    }
}
