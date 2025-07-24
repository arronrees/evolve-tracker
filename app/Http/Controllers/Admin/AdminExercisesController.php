<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Exercise;
use App\Models\MuscleGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminExercisesController extends Controller
{
    public function index()
    {
        $exercises = Exercise::with('muscleGroups')->orderBy('name', 'asc')->get();

        return Inertia::render('admin/exercises/index', ['exercises' => $exercises]);
    }

    public function create()
    {
        return Inertia::render('admin/exercises/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
        ]);

        $exercise = Exercise::create($validated);

        return redirect()->route('admin.exercises.index');
    }

    public function show(Exercise $exercise)
    {
        $exercise->load(['muscleGroups']);

        return Inertia::render('admin/exercises/show', ['exercise' => $exercise]);
    }

    public function update(Request $request, Exercise $exercise)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
        ]);

        $exercise->update($validated);

        return redirect()->route('admin.exercises.index');
    }

    public function destroy(Exercise $exercise)
    {
        if (!empty($exercise->workoutExercises->toArray())) {
            return redirect()->route('admin.exercises.show', $exercise->id)->withErrors(['Exercise is used']);
        }

        $exercise->delete();

        return redirect()->route('admin.exercises.index');
    }
}
