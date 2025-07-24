<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Exercise;
use App\Models\MuscleGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminMuscleGroupController extends Controller
{
  public function index()
  {
    $muscleGroups = MuscleGroup::orderBy('name', 'asc')->get();

    return Inertia::render('admin/muscle-groups/index', ['muscleGroups' => $muscleGroups]);
  }

  public function create()
  {
    return Inertia::render('admin/muscle-groups/create');
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'name' => 'required|string|max:255',
      'description' => 'nullable|string|max:255',
    ]);

    $muscleGroup = MuscleGroup::create($validated);

    return redirect()->route('admin.muscle-groups.index');
  }

  public function show(MuscleGroup $muscleGroup)
  {
    $exercises = Exercise::orderBy('name', 'asc')->get();

    return Inertia::render('admin/muscle-groups/show', ['muscleGroup' => $muscleGroup, 'exercises' => $exercises]);
  }

  public function update(Request $request, MuscleGroup $muscleGroup)
  {
    $validated = $request->validate([
      'name' => 'required|string|max:255',
      'description' => 'nullable|string|max:255',
    ]);

    $muscleGroup->update($validated);

    $validatedExercises = $request->validate([
      'exercises' => ['nullable', 'array'],
      'exercises.*.id' => ['required', 'integer', 'min:1'],
      'exercises.*.name' => ['required', 'string', 'max:255'],
    ]);

    if (!empty($validatedExercises['exercises'])) {
      $exercisesData = [];

      foreach ($validatedExercises['exercises'] as $exerciseData) {
        $exercisesData[] = [
          'muscle_group_id' => $muscleGroup->id,
          'exercise_id' => $exerciseData['id'],
          'created_at' => now(),
          'updated_at' => now(),
        ];
      }

      DB::table('exercise_muscle_groups')->insert($exercisesData);
    }

    return redirect()->route('admin.muscle-groups.index');
  }
}
