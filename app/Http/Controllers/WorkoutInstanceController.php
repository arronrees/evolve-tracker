<?php

namespace App\Http\Controllers;

use App\Http\Requests\RecordWorkoutRequest;
use App\Models\Exercise;
use App\Models\MuscleGroup;
use App\Models\Workout;
use App\Models\WorkoutInstance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class WorkoutInstanceController extends Controller
{
    public function create(Workout $workout)
    {
        $exercises = Exercise::with('muscleGroups')->get();
        $muscleGroups = MuscleGroup::get();

        $workout->load(['exercises' => function ($query) {
            $query->with(['exercise' => function ($query) {
                $query->with('muscleGroups');
            }, 'sets'])
                ->orderBy('order');
        }]);

        return Inertia::render('workouts/instances/create', ['workout' => $workout, 'exercises' => $exercises, 'muscleGroups' => $muscleGroups]);
    }

    public function store(RecordWorkoutRequest $request, Workout $workout)
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated, $request, $workout) {
            $instance = WorkoutInstance::create(['workout_id' => $workout->id, 'user_id' => $request->user()->id]);

            if (!empty($validated['exercises'])) {
                $exercisesData = [];

                foreach ($validated['exercises'] as $exerciseData) {
                    $exercisesData[] = [
                        'workout_instance_id' => $instance->id,
                        'exercise_id' => $exerciseData['exercise_id'],
                        'user_id' => $request->user()->id,
                        'order' => $exerciseData['order'],
                    ];
                }

                DB::table('workout_exercise_instances')->insert($exercisesData);

                $insertedExercises = DB::table('workout_exercise_instances')
                    ->where('workout_instance_id', $instance->id)
                    ->orderBy('order')
                    ->get();

                $setsData = [];

                foreach ($validated['exercises'] as $index => $exerciseData) {
                    $exerciseId = $insertedExercises[$index]->id;

                    foreach ($exerciseData['sets'] as $setData) {
                        $setsData[] = [
                            'workout_exercise_instance_id' => $exerciseId,
                            'order' => $setData['order'],
                            'reps' => $setData['reps'] ?? null,
                            'weight' => $setData['weight'] ?? null,
                            'duration_seconds' => $setData['duration_seconds'] ?? null,
                            'distance_meters' => $setData['distance_meters'] ?? null,
                            'rest_seconds' => $setData['rest_seconds'] ?? null,
                        ];
                    }
                }

                if (!empty($setsData)) {
                    DB::table('workout_set_instances')->insert($setsData);
                }
            }
        });

        return redirect()->route('workouts');
    }
}
