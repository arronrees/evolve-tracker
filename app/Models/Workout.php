<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workout extends Model
{
    /** @use HasFactory<\Database\Factories\WorkoutFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'is_public',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function exercises()
    {
        return $this->belongsToMany(Exercise::class, 'workout_exercises')
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
            ->as('data')
            ->orderBy('workout_exercises.order');
    }
}
