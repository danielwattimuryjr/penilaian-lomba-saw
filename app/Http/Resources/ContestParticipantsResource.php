<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContestParticipantsResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama_peserta' => $this->nama,
            'nomor_peserta' => $this->nomor_peserta,
            'email' => $this->email,
            'nomor_telepon' => $this->nomor_telepon,
            'created_at' => $this->created_at->toFormattedDateString(),
        ];
    }
}
