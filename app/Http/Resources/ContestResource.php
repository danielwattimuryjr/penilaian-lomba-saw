<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContestResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'nama_perlombaan' => $this->title,
            'kd_contest' => $this->kd_contest,
            'created_by' => $this->created_by->name,
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
        ];
    }
}
