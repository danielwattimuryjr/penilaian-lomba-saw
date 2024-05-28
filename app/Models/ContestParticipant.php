<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContestParticipant extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'nomor_peserta',
        'email',
        'nomor_telepon'
    ];

    protected $guarded = [
        'contest_id'
    ];

    public function contest()
    {
        return $this->belongsTo(Contest::class);
    }

    public function participant_scores()
    {
        return $this->hasMany(ParticipantScore::class);
    }
}
