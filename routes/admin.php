<?php

use App\Http\Controllers\Admin\AdminExercisesController;
use App\Http\Controllers\Admin\AdminMuscleGroupController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', IsAdmin::class])->group(function () {
  Route::get('admin/exercises', [AdminExercisesController::class, 'index'])->name('admin.exercises.index');
  Route::get('admin/exercises/create', [AdminExercisesController::class, 'create'])->name('admin.exercises.create');
  Route::post('admin/exercises', [AdminExercisesController::class, 'store'])->name('admin.exercises.store');

  Route::get('admin/exercises/{exercise}', [AdminExercisesController::class, 'show'])->name('admin.exercises.show');
  Route::put('admin/exercises/{exercise}', [AdminExercisesController::class, 'update'])->name('admin.exercises.update');
  Route::delete('admin/exercises/{exercise}', [AdminExercisesController::class, 'destroy'])->name('admin.exercises.destroy');


  Route::get('admin/muscle-groups', [AdminMuscleGroupController::class, 'index'])->name('admin.muscle-groups.index');
  Route::get('admin/muscle-groups/create', [AdminMuscleGroupController::class, 'create'])->name('admin.muscle-groups.create');
  Route::post('admin/muscle-groups', [AdminMuscleGroupController::class, 'store'])->name('admin.muscle-groups.store');

  Route::get('admin/muscle-groups/{muscle_group}', [AdminMuscleGroupController::class, 'show'])->name('admin.muscle-groups.show');
  Route::put('admin/muscle-groups/{muscle_group}', [AdminMuscleGroupController::class, 'update'])->name('admin.muscle-groups.update');


  Route::get('admin/users', [AdminUserController::class, 'index'])->name('admin.users.index');
});
