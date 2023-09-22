<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'filename',
        'fileType', //'report', 'template'
        'content'
    ];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function reportViews(): HasMany
    {
        return $this->hasMany(ReportViewer::class);
    }
}
