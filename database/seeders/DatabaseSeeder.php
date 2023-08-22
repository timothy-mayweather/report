<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
	    DB::table('users')->insert([
		    'name' => 'Timothy Kibalama',
		    'email' => 'timkibalama@gmail.com',
		    'password' => '$2y$10$EJMQNG4O6Nr8EEu.SU1yjeRKl.71Orm7W1zsrVY0tn5AqPjWBGSCy',
		    'role' => 'employee'
	    ]);
    }
}
