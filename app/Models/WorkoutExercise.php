<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\Pivot;

class WorkoutExercise extends Pivot
{
    protected $table = 'workout_exercises';

    protected $fillable = [
        'workout_id',
        'exercise_id',
        'order',
        'notes'
    ];

    public function workout(): BelongsTo
    {
        return $this->belongsTo(Workout::class);
    }

    public function exercise(): BelongsTo
    {
        return $this->belongsTo(Exercise::class);
    }

    public function sets(): HasMany
    {
        return $this->hasMany(WorkoutSet::class, 'workout_exercise_id')->orderBy('order');
    }
}
