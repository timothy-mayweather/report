<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShareRule extends Model
{
    use HasFactory;

    protected $fillable = [
	    'employment_role_id',
	    'shared_role',
	    'role_shared',
	    'edit'
    ];
}
