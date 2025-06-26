<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MuscleGroup extends Model
{
    /** @use HasFactory<\Database\Factories\MuscleGroupFactory> */
    use HasFactory;

    protected $fillable = ['name', 'description'];

    public function exercises()
    {
        return $this->belongsToMany(Exercise::class);
    }
}
