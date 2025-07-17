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
    public function single(Request $request, Workout $workout)
    {
        $instances = WorkoutInstance::where('workout_id', $workout->id)
            ->where('user_id', $request->user()->id)
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
            ->get();

        return Inertia::render('workouts/instances/single', ['workout' => $workout, 'instances' => $instances]);
    }

    public function index(Request $request)
    {
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
            ->get();

        return Inertia::render('workouts/instances/index', ['instances' => $instances]);
    }

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
                        'created_at' => now(),
                        'updated_at' => now(),
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
                            'created_at' => now(),
                            'updated_at' => now(),
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

    public function show(Workout $workout, WorkoutInstance $workout_instance)
    {
        $workout_instance->load([
            'workout',
            'exercises' => function ($query) {
                $query->with(['exercise' => function ($query) {
                    $query->with('muscleGroups');
                }, 'sets'])
                    ->orderBy('order');
            }
        ]);

        return Inertia::render('workouts/instances/show', ['workout' => $workout, 'instance' => $workout_instance]);
    }
}
