<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AssessmentFactorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama_faktor' => $this->nama_faktor,
            'bobot_penilaian' => $this->bobot_penilaian
        ];
    }
}
