export interface MuscleGroup {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    description: string | null;
}

export interface Exercise {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    description: string | null;
    muscle_groups: MuscleGroup[];
    measurement: 'reps_only' | 'weight' | 'time' | 'distance' | 'time_or_distance';
}
