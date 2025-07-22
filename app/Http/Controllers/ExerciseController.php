<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use App\Models\WorkoutExercise;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExerciseController extends Controller
{
    public function index(Request $request)
    {
        $exercises = Exercise::whereHas('workoutExerciseInstances', function ($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })
            ->with([
                'workoutExerciseInstances' => function ($query) use ($request) {
                    $query->where('user_id', $request->user()->id)
                        ->with([
                            'sets' => function ($setQuery) {
                                $setQuery->orderBy('order');
                            }
                        ])->orderBy('created_at', 'desc')->take(2);
                }
            ])
            ->get();

        return Inertia::render('exercises/index', ['exercises' => $exercises]);
    }

    public function show(Request $request, Exercise $exercise)
    {
        $exercise->load(['workoutExerciseInstances' => function ($query) use ($request, $exercise) {
            $query->where('user_id', $request->user()->id)->with([
                'workout' =>  function ($instanceQuery) use ($exercise) {
                    $instanceQuery->with(['workout' => function ($workoutQuery) use ($exercise) {
                        $workoutQuery->with(['exercises' => function ($exQuery) use ($exercise) {
                            $exQuery->where('exercise_id', $exercise->id)->with(['sets']);
                        }]);
                    }]);
                },
                'sets' => function ($setQuery) {
                    $setQuery->orderBy('order');
                },
            ])->orderBy('created_at', 'desc');
        }]);

        return Inertia::render('exercises/show', ['exercise' => $exercise]);
    }
}
