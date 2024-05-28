<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreParticipantRequest;
use App\Models\Contest;
use App\Models\ContestParticipant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Log;

class ContestParticipantController extends Controller
{
    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(Contest $contest, StoreParticipantRequest $request)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();
            $currentParticipantsCount = $contest->contestParticipants()->count() + 1;
            $formatCount = str_pad($currentParticipantsCount, 3, '0', STR_PAD_LEFT);
            $validated['nomor_peserta'] = "$contest->kd_contest-$formatCount";

            $participant = $contest->contestParticipants()->create($validated);

            Log::info("Berhasil menambahkan partisipan baru dengan ID: $participant->id");
            DB::commit();
        } catch (\Throwable $th) {
            Log::error("Terjadi kesalahan saat menambahkan partisipan. Error: " . $th->getMessage());
            DB::rollBack();
        }
    }

    public function show(ContestParticipant $contestParticipant)
    {
        //
    }

    public function edit(ContestParticipant $contestParticipant)
    {
        //
    }

    public function update(Request $request, ContestParticipant $contestParticipant)
    {
        //
    }

    public function destroy(ContestParticipant $contestParticipant)
    {
        //
    }
}
