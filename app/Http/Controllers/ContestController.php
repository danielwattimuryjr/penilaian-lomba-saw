<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContestRequest;
use App\Http\Requests\UpdateContestRequest;
use App\Http\Resources\ContestResource;
use App\Http\Resources\SingleContestResource;
use App\Models\Contest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Log;

class ContestController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'field' => Rule::in(['updated_at', 'created_at', 'title', 'slug']),
            'direction' => Rule::in(['asc', 'desc']),
        ]);

        $limit = $request->input('limit', 10);

        $test = Contest::query()
            ->with('created_by')
            ->when(
                value: $request->search,
                callback: fn($query, $value) => $query->where('title', 'like', '%' . $value . '%')
            )
            ->when(
                value: $request->field && $request->direction,
                callback: fn($query) => $query->orderBy($request->field, $request->direction),
                default: fn($query) => $query->latest()
            )
            ->fastPaginate($limit)
            ->withQueryString();

        $contests = ContestResource::collection(
            Contest::query()
                ->with('created_by')
                ->when(
                    value: $request->search,
                    callback: fn($query, $value) => $query->where('title', 'like', '%' . $value . '%')
                )
                ->when(
                    value: $request->field && $request->direction,
                    callback: fn($query) => $query->orderBy($request->field, $request->direction),
                    default: fn($query) => $query->latest()
                )
                ->fastPaginate($limit)
                ->withQueryString()
        );

        return inertia('contests/index', [
            'contests' => fn() => $contests,
            'test' => fn() => $test,
            'state' => $request->only('limit', 'page', 'search', 'field', 'direction'),
        ]);
    }

    public function create()
    {
        return inertia('contests/create');
    }

    public function store(StoreContestRequest $request)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();
            $validated['user_id'] = auth()->id();

            $contest = Contest::create($validated);

            foreach ($validated['faktor_penilaian'] as $faktor) {
                $contest->assessmentFactors()->create([
                    'nama_faktor' => $faktor['nama_faktor'],
                    'bobot_penilaian' => $faktor['bobot_penilaian']
                ]);
            }

            Log::info("Contest baru dengan ID: $contest->id");

            DB::commit();

            return to_route('contests.index');
        } catch (\Throwable $th) {
            Log::error("Error saat menambahkan contest. Error: " . $th->getMessage());

            DB::rollBack();
        }
    }

    public function show(Contest $contest)
    {
        $contest->load('assessmentFactors');
        $contest->withCount('contestParticipants');

        $contest = new SingleContestResource($contest);
        return inertia('contests/show', compact('contest'));
    }

    public function edit(Contest $contest)
    {
        //
    }

    public function update(UpdateContestRequest $request, Contest $contest)
    {
        //
    }

    public function destroy(Contest $contest)
    {
        DB::beginTransaction();

        try {
            $contest->delete();

            Log::info("Lombar dengan ID #$contest->id berhasil dihapus");

            DB::commit();
        } catch (\Throwable $th) {
            Log::error("Terjadi error saat menghapus contest dengan ID #$contest->id. Error: " . $th->getMessage());

            DB::rollBack();
        }
    }

    public function leaderboard(Contest $contest)
    {
        $saw_data = $contest->calculateSaw();
        $contest = new SingleContestResource($contest);

        return inertia('leaderboard/index', compact('saw_data', 'contest'));
    }
}
