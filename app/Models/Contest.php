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

    public function participantScores()
    {
        return $this->hasMany(ParticipantScore::class);
    }

    public function calculateSaw()
    {
        $assessmentFactors = $this->assessmentFactors;
        $participants = $this->participantScores->groupBy('contest_participant_id');

        $normalizedScores = $this->normalizeScores($participants, $assessmentFactors);
        $weightedScores = $this->calculateWeightedScores($normalizedScores, $assessmentFactors);
        $finalScores = $this->calculateFinalScores($weightedScores, $participants, $assessmentFactors);

        // dd($normalizedScores, $weightedScores, $finalScores);
        return $finalScores;
    }

    private function normalizeScores($participants, $assessmentFactors)
    {
        $normalizedScores = [];
        $maxScores = [];

        foreach ($assessmentFactors as $factor) {
            $maxScore = $participants
                ->flatten()
                ->where('contest_assessment_factor_id', $factor->id)
                ->pluck('score')
                ->max();

            $maxScores[$factor->id] = $maxScore ?: 0;
        }

        foreach ($participants as $userId => $userScores) {
            $normalizedRow = [];
            foreach ($assessmentFactors as $factor) {
                $score = $userScores->where('contest_assessment_factor_id', $factor->id)->pluck('score')->first() ?? 0;
                $maxScore = $maxScores[$factor->id];
                $normalizedScore = $maxScore > 0 ? $score / $maxScore : 0;
                $normalizedRow[$factor->id] = [
                    'factor' => $factor->nama_faktor,
                    'score' => $score,
                    'max_score' => $maxScore,
                    'normalized_score' => $normalizedScore
                ];
            }
            $normalizedScores[$userId] = $normalizedRow;
        }

        return $normalizedScores;
    }

    private function calculateWeightedScores($normalizedScores, $assessmentFactors)
    {
        // dd($normalizedScores, $assessmentFactors);
        $weightedScores = [];

        foreach ($normalizedScores as $userId => $normalizedRow) {
            $weightedRow = [];
            foreach ($assessmentFactors as $factor) {
                $weight = $factor->bobot_penilaian / 100; // Mengubah bobot penilaian menjadi desimal
                $normalizedScore = $normalizedRow[$factor->id]['normalized_score'];
                $weightedRow[$factor->id] = [
                    'factor' => $factor->nama_faktor,
                    'weight' => $weight,
                    'weighted_score' => $normalizedScore * $weight
                ];
            }
            $weightedScores[$userId] = $weightedRow;
        }

        return $weightedScores;
    }

    private function calculateFinalScores($weightedScores, $participants, $assessmentFactors)
    {
        $finalScores = [];

        foreach ($weightedScores as $participantId => $weightedRow) {
            $user = ContestParticipant::find($participantId);
            $finalScore = 0;
            $userScores = $participants[$participantId];

            foreach ($weightedRow as $factorScore) {
                $finalScore += $factorScore['weighted_score'];
            }

            $finalScores[$participantId] = [
                'user' => $user->nama,
                'final_score' => $finalScore,
                'details' => []
            ];

            foreach ($assessmentFactors as $factor) {
                $score = $userScores->where('contest_assessment_factor_id', $factor->id)->pluck('score')->first() ?? 0;
                $finalScores[$participantId]['details'][] = [
                    'factor' => $factor->nama_faktor,
                    'weight' => $factor->bobot_penilaian / 100,
                    'score' => $score
                ];
            }
        }

        $sortedFinalScores = collect($finalScores)->sortByDesc('final_score')->values()->all();

        return $sortedFinalScores;
    }
}
