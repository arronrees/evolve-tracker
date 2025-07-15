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
        Schema::create('workout_instances', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignId('workout_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
        });

        Schema::create('workout_exercise_instances', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignId('workout_instance_id')->constrained()->onDelete('cascade');
            $table->foreignId('exercise_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->integer('order')->default(1);

            $table->unique(['workout_instance_id', 'order']);
            $table->index(['workout_instance_id', 'order']);
        });

        Schema::create('workout_set_instances', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignId('workout_exercise_instance_id')->constrained()->onDelete('cascade');

            $table->integer('order')->default(1);
            $table->integer('reps')->nullable();
            $table->decimal('weight')->nullable();
            $table->integer('duration_seconds')->nullable();
            $table->decimal('distance_meters')->nullable();
            $table->integer('rest_seconds')->nullable();

            $table->unique(['workout_exercise_instance_id', 'order']);
            $table->index(['workout_exercise_instance_id', 'order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workout_instances');
        Schema::dropIfExists('workout_exercise_instances');
        Schema::dropIfExists('workout_set_instances');
    }
};
