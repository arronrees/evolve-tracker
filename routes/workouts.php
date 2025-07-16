<?php

use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\WorkoutInstanceController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
  Route::get('workouts', [WorkoutController::class, 'index'])->name('workouts');
  Route::get('workouts/create', [WorkoutController::class, 'create'])->name('workouts.create');
  Route::post('workouts', [WorkoutController::class, 'store'])->name('workouts.store');

  Route::get('workouts/history', [WorkoutInstanceController::class, 'index'])->name('workouts.instances.index');

  Route::get('workouts/{workout}', [WorkoutController::class, 'show'])->name('workouts.show');
  Route::get('workouts/{workout}/edit', [WorkoutController::class, 'edit'])->name('workouts.edit');
  Route::put('workouts/{workout}', [WorkoutController::class, 'update'])->name('workouts.update');
  Route::delete('workouts/{workout}', [WorkoutController::class, 'destroy'])->name('workouts.destroy');

  Route::get('workouts/{workout}/start', [WorkoutInstanceController::class, 'create'])->name('workouts.instances.create');
  Route::post('workouts/{workout}/start', [WorkoutInstanceController::class, 'store'])->name('workouts.instances.store');
  Route::get('workouts/{workout}/history', [WorkoutInstanceController::class, 'single'])->name('workouts.instances.single');
  Route::get('workouts/{workout}/history/{workout_instance}', [WorkoutInstanceController::class, 'show'])->name('workouts.instances.show');
});
