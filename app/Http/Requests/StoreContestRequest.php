<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContestRequest extends FormRequest
{
    public function authorize(): bool
    {
        $user = auth()->user();

        if ($user) {
            return true;
        }

        return false;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|max:255|unique:contests,title',
            'kd_contest' => 'required|unique:contests,kd_contest',
            'faktor_penilaian' => 'required',
            'faktor_penilaian.*.nama_faktor' => 'required|max:255',
            'faktor_penilaian.*.bobot_penilaian' => 'required|numeric|max:100|min:1'
        ];
    }
}
