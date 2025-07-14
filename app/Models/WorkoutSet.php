<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WorkoutSet extends Model
{
    protected $fillable = [
        'workout_exercise_id',
        'order',
        'reps',
        'weight',
        'duration_seconds',
        'distance_meters',
        'rest_seconds',
        'notes'
    ];

    protected function casts(): array
    {
        return [
            'weight' => 'float',
            'distance_meters' => 'float',
            'reps' => 'integer',
            'duration_seconds' => 'integer',
            'rest_seconds' => 'integer',
            'order' => 'integer',
        ];
    }

    public function exercise(): BelongsTo
    {
        return $this->belongsTo(WorkoutExercise::class, 'workout_exercise_id');
    }
}
