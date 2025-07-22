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
        $weight = WorkoutSetInstance::whereNotNull('weight')
            ->whereNotNull('reps')
            ->selectRaw('SUM(weight * reps) as total_volume')
            ->value('total_volume');

        $sets = WorkoutSetInstance::count();

        $reps = WorkoutSetInstance::sum('reps');

        return Inertia::render('dashboard', ['weight' => $weight, 'sets' => $sets, 'reps' => $reps]);
    }
}
