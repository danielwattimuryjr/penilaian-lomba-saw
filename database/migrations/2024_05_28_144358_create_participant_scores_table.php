<?php

use App\Models\Contest;
use App\Models\ContestAssessmentFactor;
use App\Models\ContestParticipant;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('participant_scores', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(ContestParticipant::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(ContestAssessmentFactor::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Contest::class)->constrained()->cascadeOnDelete();
            $table->string('score');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('participant_scores');
    }
};
