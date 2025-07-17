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
}
