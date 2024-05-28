<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContestAssessmentFactor extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_faktor',
        'bobot_penilaian',
    ];

    protected $guarded = [
        'id',
        'contest_id'
    ];

    protected $casts = [
        'bobot' => 'integer',
    ];

    public function contest()
    {
        return $this->belongsTo(Contest::class);
    }
}
