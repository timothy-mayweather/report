<?php

namespace Database\Seeders;

use App\Models\Report;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
					User::insert([
						[
							'name' => 'Timothy Kibalama',
							'email' => 'timkibalama@gmail.com',
							'password' => '$2y$10$EJMQNG4O6Nr8EEu.SU1yjeRKl.71Orm7W1zsrVY0tn5AqPjWBGSCy',
							'role' => 'admin',
							'created_at'=>date('Y-m-d H:i:s'),
							'updated_at'=>date('Y-m-d H:i:s'),
							'email_verified_at'=>date('Y-m-d H:i:s'),
						],
						[
							'name' => 'Mwesezi Godwin',
							'email' => 'mwessygodleeh@gmail.com',
							'password' => '$2y$10$WGhdS3R.wzkFV.UQ52TGAeT5AEbSxaq.4BSFXtlM8kzh6eq55Sa8e',
							'role' => 'admin',
							'created_at'=>date('Y-m-d H:i:s'),
							'updated_at'=>date('Y-m-d H:i:s'),
							'email_verified_at'=>date('Y-m-d H:i:s'),
						]
					]);

	    $recordTable = "<table>\n" .
	    "                    <thead>\n" .
	    "                    <tr>\n" .
	    "                        <th>Sn</th>\n" .
	    "                        <th>\n" .
	    "                            Corporate\n" .
	    "                            Objectives\n" .
	    "                        </th>\n" .
	    "                        <th>\n" .
	    "                            Individual Objectives: What you are\n" .
	    "                            to do / achieve and by when- to\n" .
	    "                            contribute to the achievement of the\n" .
	    "                            Company objective\n" .
	    "                        </th>\n" .
	    "                        <th>\n" .
	    "                            By when\n" .
	    "                        </th>\n" .
	    "                        <th>\n" .
	    "                            Agreed\n" .
	    "                            Weights\n" .
	    "                        </th>\n" .
	    "                        <th>\n" .
	    "                            Indicator/ measure\n" .
	    "                            (what will show that\n" .
	    "                            you have achieved\n" .
	    "                            what you set out to\n" .
	    "                            achieve?)\n" .
	    "                        </th>\n" .
	    "                        <th>\n" .
	    "                            Remarks\n" .
	    "                        </th>\n" .
	    "                        <th>\n" .
	    "                            Marks\n" .
	    "                        </th>\n" .
	    "                    </tr>\n" .
	    "                    </thead>\n" .
	    "                    <tbody>\n" .
	    "                    <tr>\n" .
	    "                        <td></td>\n" .
	    "                        <td></td>\n" .
	    "                        <td></td>\n" .
	    "                        <td></td>\n" .
	    "                        <td></td>\n" .
	    "                        <td></td>\n" .
	    "                        <td></td>\n" .
	    "                        <td></td>\n" .
	    "                    </tr>\n" .
	    "                    </tbody>\n" .
	    "                </table>\n";

			Report::create([
				'filename'=>'objectives template',
				'fileType' => 'template',
				'user_id' => 2,
				'content' => $recordTable,
				'created_at'=>date('Y-m-d H:i:s'),
				'updated_at'=>date('Y-m-d H:i:s')
			]);

    }
}


