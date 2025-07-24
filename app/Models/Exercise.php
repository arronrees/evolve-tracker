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
        return $this->belongsToMany(MuscleGroup::class, 'exercise_muscle_groups');
    }

    public function workoutExercises()
    {
        return $this->hasMany(WorkoutExercise::class);
    }

    public function workoutExerciseInstances()
    {
        return $this->hasMany(WorkoutExerciseInstance::class);
    }
}
