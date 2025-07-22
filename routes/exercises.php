<?php

use App\Http\Controllers\ExerciseController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
  Route::get('exercises', [ExerciseController::class, 'index'])->name('exercises');
  Route::get('exercises/{exercise}', [ExerciseController::class, 'show'])->name('exercises.show');
});
