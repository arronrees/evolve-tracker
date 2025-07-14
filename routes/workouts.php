<?php

use App\Http\Controllers\WorkoutController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
  Route::get('workouts', [WorkoutController::class, 'index'])->name('workouts');
  Route::get('workouts/create', [WorkoutController::class, 'create'])->name('workouts.create');
  Route::post('workouts', [WorkoutController::class, 'store'])->name('workouts.store');
});
