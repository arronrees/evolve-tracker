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
        Schema::create('workouts', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string('name');
            $table->string('description')->nullable();
            $table->boolean('is_public')->default(false);

            $table->foreignId('user_id')->constrained()->onDelete('cascade');
        });

        Schema::create('workout_exercises', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignId('workout_id')->constrained()->onDelete('cascade');
            $table->foreignId('exercise_id')->constrained()->onDelete('cascade');

            $table->integer('order')->default(1);

            $table->string('notes')->nullable();

            $table->unique(['workout_id', 'order']);
            $table->index(['workout_id', 'order']);
        });

        Schema::create('workout_sets', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignId('workout_exercise_id')->constrained()->onDelete('cascade');

            $table->integer('order')->default(1);
            $table->integer('reps')->nullable();
            $table->decimal('weight')->nullable();
            $table->integer('duration_seconds')->nullable();
            $table->decimal('distance_meters')->nullable();
            $table->integer('rest_seconds')->nullable();
            $table->string('notes')->nullable();

            $table->unique(['workout_exercise_id', 'order']);
            $table->index(['workout_exercise_id', 'order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workouts');
        Schema::dropIfExists('workout_exercises');
        Schema::dropIfExists('workout_sets');
    }
};
