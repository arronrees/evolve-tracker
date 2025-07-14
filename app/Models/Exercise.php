<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    /** @use HasFactory<\Database\Factories\ExerciseFactory> */
    use HasFactory;

    protected $fillable = ['name', 'description', 'measurement'];

    public function getMuscleGroupsAttribute()
    {
        return $this->muscleGroups()->get();
    }

    public function muscleGroups()
    {
        return $this->belongsToMany(MuscleGroup::class);
    }

    public function workouts()
    {
        return $this->belongsToMany(Workout::class, 'workout_exercises')
            ->withPivot([
                'sets',
                'reps',
                'weight',
                'duration_seconds',
                'distance',
                'rest_seconds',
                'order',
                'notes'
            ])
            ->withTimestamps()
            ->as('data');
    }
}
