export interface MuscleGroup {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    description: string | null;
}

export interface Exercise {
    id: number;
    created_at: string | null;
    updated_at: string | null;
    name: string;
    description: string | null;
    measurement: 'reps_only' | 'weight' | 'time' | 'distance' | 'time_or_distance';
    muscle_groups: MuscleGroup[];
}

export interface Workout {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    description: string | null;
    is_public: boolean;
    user_id: number;
    exercises: WorkoutExercise[];
}

interface WorkoutExercise {
    id: number;
    created_at: string | null;
    updated_at: string | null;
    workout_id: number;
    exercise_id: number;
    order: number;
    notes: string | null;
    exercise: Exercise;
    sets: WorkoutExerciseSet[];
}

interface WorkoutExerciseSet {
    id: number;
    created_at: string | null;
    updated_at: string | null;
    workout_exercise_id: number;
    order: number;
    reps: number | null;
    weight: number | null;
    duration_seconds: number | null;
    distance_meters: number | null;
    rest_seconds: number | null;
    notes: string | null;
}

export interface FormWorkoutExercise {
    exercise_id: number;
    measurement: 'reps_only' | 'weight' | 'time' | 'distance' | 'time_or_distance';
    name: string;
    order: number;
    notes?: string;
    sets: FormWorkoutSet[];
}

export interface FormWorkoutSet {
    id: string;
    order: number;
    reps?: number;
    weight?: number;
    duration_seconds?: number;
    distance_meters?: number;
    rest_seconds?: number;
}
