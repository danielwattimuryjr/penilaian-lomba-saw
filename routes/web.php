<?php

use App\Http\Controllers\Auth\DestroyAccountController;
use App\Http\Controllers\Auth\SecurityController;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\ContestController;
use App\Http\Controllers\ContestParticipantController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ParticipantScoreController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::middleware('auth')->group(function () {
    Route::get('dashboard', DashboardController::class)->middleware(['verified'])->name('dashboard');

    Route::controller(ProfileController::class)->group(function () {
        Route::get('profile', 'index')->name('profile.index');
        Route::patch('profile', 'update')->name('profile.update');
    });

    Route::controller(SecurityController::class)->group(function () {
        Route::get('security', 'index')->name('security.index');
        Route::patch('security', 'update')->name('security.update');
    });

    Route::controller(DestroyAccountController::class)->group(function () {
        Route::get('danger', 'index')->name('danger.index');
        Route::delete('danger', 'destroy')->name('danger.destroy');
    });

    Route::controller(UserController::class)->group(function () {
        Route::get('users', 'index')->name('users.index');
        Route::get('users/{user}', 'show')->name('users.show');
        Route::delete('users/{user}', 'destroy')->name('users.destroy');
    });

    Route::resource('contests', ContestController::class);
    Route::post('contest/{contest}/add-participant', [ContestParticipantController::class, 'store'])->name('contest_participants.store');
    Route::get('contest/{contest}/participant/{contest_participant}', [ParticipantScoreController::class, 'create'])->name('participant_score.create');
    Route::post('contest/{contest}/participant/{contest_participant}', [ParticipantScoreController::class, 'store'])->name('participant_score.store');

    Route::get('contest/{contest}/leaderboard', [ContestController::class, 'leaderboard'])->name('contests.leaderboard');
});


require __DIR__ . '/auth.php';
