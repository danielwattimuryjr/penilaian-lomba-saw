<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contest extends Model
{
    use HasFactory;

    public function getRouteKeyName()
    {
        return 'kd_contest';
    }

    protected $fillable = [
        'title',
        'kd_contest',
        'user_id'
    ];

    protected $guarded = [
        'id'
    ];

    public function created_by()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function assessmentFactors()
    {
        return $this->hasMany(ContestAssessmentFactor::class);
    }

    public function contestParticipants()
    {
        return $this->hasMany(ContestParticipant::class);
    }
}
