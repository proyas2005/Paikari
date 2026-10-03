<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Price extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'submitter_id',
        'location_id',
        'amount',
        'currency',
        'photo_path',
        'status',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }

    public function submitter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'submitter_id');
    }

    
    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class);
    }
}
