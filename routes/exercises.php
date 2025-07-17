<?php

use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\WorkoutInstanceController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
  Route::get('exercises', [ExerciseController::class, 'index'])->name('exercises');
});
