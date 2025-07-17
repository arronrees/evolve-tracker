<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateWorkoutRequest;
use App\Http\Requests\UpdateWorkoutRequest;
use App\Models\Exercise;
use App\Models\MuscleGroup;
use App\Models\Workout;
use App\Models\WorkoutInstance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class WorkoutController extends Controller
{
    public function index(Request $request)
    {
        $workouts = Workout::with(['exercises'])
            ->where('user_id', Auth::id())
            ->orderBy('created_at')
            ->get();

        $instances = WorkoutInstance::where('user_id', $request->user()->id)
            ->with([
                'workout',
                'exercises' => function ($query) {
                    $query->with(['exercise' => function ($query) {
                        $query->with('muscleGroups');
                    }, 'sets'])
                        ->orderBy('order');
                }
            ])
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();

        return Inertia::render('workouts/index', [
            'workouts' => $workouts,
            'instances' => $instances,
        ]);
    }

    public function create()
    {
        $exercises = Exercise::with('muscleGroups')->get();
        $muscleGroups = MuscleGroup::get();

        return Inertia::render('workouts/create', ['exercises' => $exercises, 'muscleGroups' => $muscleGroups]);
    }

    public function store(CreateWorkoutRequest $request)
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated, $request) {
            $workout = Workout::create([
                'name' => $validated['name'],
                'description' => $validated['description'] ?? null,
                'is_public' => $validated['is_public'] ?? false,
                'user_id' => $request->user()->id,
            ]);

            if (!empty($validated['exercises'])) {
                $exercisesData = [];

                foreach ($validated['exercises'] as $exerciseData) {
                    $exercisesData[] = [
                        'workout_id' => $workout->id,
                        'exercise_id' => $exerciseData['exercise_id'],
                        'order' => $exerciseData['order'],
                        'notes' => $exerciseData['notes'] ?? null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }

                DB::table('workout_exercises')->insert($exercisesData);

                $insertedExercises = DB::table('workout_exercises')
                    ->where('workout_id', $workout->id)
                    ->orderBy('order')
                    ->get();

                $setsData = [];

                foreach ($validated['exercises'] as $index => $exerciseData) {
                    $exerciseId = $insertedExercises[$index]->id;

                    foreach ($exerciseData['sets'] as $setData) {
                        $setsData[] = [
                            'workout_exercise_id' => $exerciseId,
                            'order' => $setData['order'],
                            'reps' => $setData['reps'] ?? null,
                            'weight' => $setData['weight'] ?? null,
                            'duration_seconds' => $setData['duration_seconds'] ?? null,
                            'distance_meters' => $setData['distance_meters'] ?? null,
                            'rest_seconds' => $setData['rest_seconds'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }

                if (!empty($setsData)) {
                    DB::table('workout_sets')->insert($setsData);
                }
            }
        });

        return redirect()->route('workouts');
    }

    public function show(Workout $workout)
    {
        $workout->load([
            'exercises' => function ($query) {
                $query->with([
                    'exercise' => function ($query) {
                        $query->with('muscleGroups');
                    },
                    'sets'
                ])
                    ->orderBy('order');
            },
            'instances' => function ($query) {
                $query->with([
                    'exercises' => function ($query) {
                        $query->with(['sets', 'exercise']);
                    }
                ])->orderBy('created_at', 'desc')->take(10);
            }
        ]);

        return Inertia::render('workouts/show', [
            'workout' => $workout,
        ]);
    }

    public function edit(Workout $workout)
    {
        $workout->load(['exercises' => function ($query) {
            $query->with(['exercise' => function ($query) {
                $query->with('muscleGroups');
            }, 'sets'])
                ->orderBy('order');
        }]);

        $exercises = Exercise::with('muscleGroups')->get();
        $muscleGroups = MuscleGroup::get();

        return Inertia::render('workouts/edit', [
            'workout' => $workout,
            'exercises' => $exercises,
            'muscleGroups' => $muscleGroups,
        ]);
    }

    public function update(UpdateWorkoutRequest $request, Workout $workout)
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated, $workout) {
            $workout->update([
                'name' => $validated['name'],
                'description' => $validated['description'] ?? null,
                'is_public' => $validated['is_public'] ?? false,
            ]);

            $workout->exercises()->delete();

            if (!empty($validated['exercises'])) {
                $exercisesData = [];

                foreach ($validated['exercises'] as $exerciseData) {
                    $exercisesData[] = [
                        'workout_id' => $workout->id,
                        'exercise_id' => $exerciseData['exercise_id'],
                        'order' => $exerciseData['order'],
                        'notes' => $exerciseData['notes'] ?? null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }

                DB::table('workout_exercises')->insert($exercisesData);

                $insertedExercises = DB::table('workout_exercises')
                    ->where('workout_id', $workout->id)
                    ->orderBy('order')
                    ->get();

                $setsData = [];

                foreach ($validated['exercises'] as $index => $exerciseData) {
                    $exerciseId = $insertedExercises[$index]->id;

                    foreach ($exerciseData['sets'] as $setData) {
                        $setsData[] = [
                            'workout_exercise_id' => $exerciseId,
                            'order' => $setData['order'],
                            'reps' => $setData['reps'] ?? null,
                            'weight' => $setData['weight'] ?? null,
                            'duration_seconds' => $setData['duration_seconds'] ?? null,
                            'distance_meters' => $setData['distance_meters'] ?? null,
                            'rest_seconds' => $setData['rest_seconds'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }

                if (!empty($setsData)) {
                    DB::table('workout_sets')->insert($setsData);
                }
            }
        });

        return redirect()->route('workouts.show', ['workout' => $workout->id]);
    }

    public function destroy(Workout $workout)
    {
        $workout->delete();

        return redirect()->route('workouts');
    }
}
