<?php

namespace App\Http\Controllers;

use App\Models\WorkoutSetInstance;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $userId = $request->user()->id;

        $weight = WorkoutSetInstance::whereNotNull('weight')
            ->whereNotNull('reps')
            ->join('workout_exercise_instances', 'workout_set_instances.workout_exercise_instance_id', '=', 'workout_exercise_instances.id')
            ->where('workout_exercise_instances.user_id', $userId)
            ->selectRaw('SUM(workout_set_instances.weight * workout_set_instances.reps) as total_volume')
            ->value('total_volume');

        $sets = WorkoutSetInstance::join('workout_exercise_instances', 'workout_set_instances.workout_exercise_instance_id', '=', 'workout_exercise_instances.id')
            ->where('workout_exercise_instances.user_id', $userId)
            ->count();

        $reps = WorkoutSetInstance::join('workout_exercise_instances', 'workout_set_instances.workout_exercise_instance_id', '=', 'workout_exercise_instances.id')
            ->where('workout_exercise_instances.user_id', $userId)
            ->sum('workout_set_instances.reps');

        return Inertia::render('dashboard', ['weight' => $weight, 'sets' => $sets, 'reps' => $reps]);
    }
}
