<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParticipantScore extends Model
{
    use HasFactory;

    protected $fillable = [
        'score',
        'contest_participant_id',
        'contest_assessment_factor_id'
    ];

    protected $casts = [
        'score' => 'integer',
    ];

    public function contest_participant()
    {
        return $this->belongsTo(ContestParticipant::class);
    }

    public function contest()
    {
        return $this->belongsTo(Contest::class);
    }

    public function contest_assessment_factor()
    {
        return $this->belongsTo(ContestAssessmentFactor::class);
    }
}
