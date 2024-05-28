<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SingleContestResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'nama_perlombaan' => $this->title,
            'kd_perlombaan' => $this->kd_contest,
            'faktor_penilaian' => AssessmentFactorResource::collection($this->assessmentFactors),
            'participants' => ContestParticipantsResource::collection($this->contestParticipants),
            'total_participant' => $this->contestParticipants()->count()
        ];
    }
}
