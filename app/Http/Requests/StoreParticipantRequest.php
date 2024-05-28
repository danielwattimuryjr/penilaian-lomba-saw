<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreParticipantRequest extends FormRequest
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
            'nama' => 'required|max:255',
            'email' => 'required|email',
            'nomor_telepon' => 'required|max:13|min:13',
        ];
    }
}
