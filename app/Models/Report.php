<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Events\ReportCreated;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'sn',
        'corporateObjectives',
        'individualObjectives',
        'byWhen',
        'agreedWeights',
        'indicators',
        'remarks',
        'marks'
    ];

    protected $dispatchesEvents = [
        'created' => ReportCreated::class,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
