<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('muscle_groups', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string('name');
            $table->string('description')->nullable();
        });

        Schema::create('exercises', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string('name');
            $table->string('description')->nullable();
            $table->enum('measurement', ['reps_only', 'weight', 'time', 'distance', 'time_or_distance'])->default('weight');
        });

        Schema::create('exercise_muscle_group', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignId('exercise_id')->constrained()->onDelete('cascade');
            $table->foreignId('muscle_group_id')->constrained()->onDelete('cascade');

            $table->unique(['exercise_id', 'muscle_group_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exercises');
        Schema::dropIfExists('muscle_groups');
        Schema::dropIfExists('exercise_muscle_group');
    }
};
