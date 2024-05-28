<?php

namespace App\Http\Requests;

use App\Models\ContestAssessmentFactor;
use Illuminate\Foundation\Http\FormRequest;

class StoreParticipantScoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        $user = auth()->user();

        if ($user)
            return true;

        return false;
    }

    public function rules(): array
    {
        $availableContestAssessmentFactor = ContestAssessmentFactor::pluck('id')->toArray();

        return [
            'form' => 'required',
            'form.*.factor_id' => 'required|in:' . implode(',', $availableContestAssessmentFactor),
            'form.*.score' => 'required|numeric|min:1|max:100'
        ];
    }
}
