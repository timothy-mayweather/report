<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EmploymentRole extends Model
{
    use HasFactory;

    protected $fillable = [
      'name'
    ];

	public function shareRules(): HasMany
	{
		return $this->hasMany(ShareRule::class);
	}
}
