<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreParticipantScoreRequest;
use App\Models\Contest;
use App\Models\ContestAssessmentFactor;
use App\Models\ContestParticipant;
use App\Models\ParticipantScore;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Log;

class ParticipantScoreController extends Controller
{
    public function create(Contest $contest, ContestParticipant $contestParticipant)
    {
        $factors = $contest->assessmentFactors;
        return inertia('participant-score/create', compact('factors', 'contest', 'contestParticipant'));
    }

    public function store(Contest $contest, ContestParticipant $contestParticipant, StoreParticipantScoreRequest $request)
    {
        DB::beginTransaction();

        try {
            $validated = $request->validated();

            foreach ($validated['form'] as $data) {
                $contest->participantScores()->create([
                    'contest_participant_id' => $contestParticipant->id,
                    'contest_assessment_factor_id' => $data['factor_id'],
                    'score' => $data['score']
                ]);
                Log::info("Berhasil memberikan nilai ke partisipan dengan ID: $contestParticipant->id. Faktor ID: " . $data['factor_id'] . '. Nilai: ' . $data['score']);
            }

            DB::commit();

            return to_route('contests.show', $contest);
        } catch (\Throwable $th) {
            Log::error('Terjadi kesalahan. Error: ' . $th->getMessage());

            DB::rollBack();
        }


    }
}
