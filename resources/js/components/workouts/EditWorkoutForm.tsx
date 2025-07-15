import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Exercise, FormWorkoutExercise, MuscleGroup, Workout } from '@/types/workouts';
import { useForm } from '@inertiajs/react';
import { XIcon } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import ExerciseCard from './ExerciseCard';
import ExerciseSelection from './ExerciseSelection';

interface EditWorkout {
    name: string;
    description?: string;
    is_public?: boolean;
    exercises?: FormWorkoutExercise[];
}

export interface EditWorkoutForm extends EditWorkout {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

interface Props {
    workout: Workout;
    exercises: Exercise[];
    muscleGroups: MuscleGroup[];
}

export default function EditWorkoutForm({ workout, exercises, muscleGroups }: Props) {
    const [availableExercises, setAvailableExercises] = useState<Exercise[]>(
        exercises.filter((ex) => !workout.exercises?.some((we) => we.exercise_id === ex.id)),
    );

    const { data, setData, put, errors, processing } = useForm<EditWorkoutForm>({
        name: workout.name,
        description: workout.description || '',
        is_public: workout.is_public,
        exercises: workout.exercises.map((exercise) => ({
            exercise_id: exercise.exercise_id,
            measurement: exercise.exercise.measurement,
            name: exercise.exercise.name,
            order: exercise.order,
            notes: exercise.notes ?? undefined,
            sets: exercise.sets.map((set) => ({
                id: set.id.toString(),
                order: set.order,
                reps: set.reps ?? undefined,
                weight: set.weight ?? undefined,
                duration_seconds: set.duration_seconds ?? undefined,
                distance_meters: set.distance_meters ?? undefined,
                rest_seconds: set.rest_seconds ?? undefined,
            })),
        })),
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('workouts.update', workout.id));
    };

    const removeAvailableExercise = (exerciseId: number) => {
        setAvailableExercises((prev) => prev.filter((exercise) => exercise.id !== exerciseId));
    };

    const addSelectedExercise = (exercise: Exercise) => {
        setData('exercises', [
            ...(data.exercises || []),
            {
                exercise_id: exercise.id,
                measurement: exercise.measurement,
                order: (data.exercises?.length ?? 0) + 1,
                name: exercise.name,
                sets: [],
            },
        ]);
    };

    const updateSelectedExercise = (exerciseId: number, updatedExercise: Partial<FormWorkoutExercise>) => {
        setData(
            'exercises',
            data.exercises?.map((ex) => {
                if (ex.exercise_id === exerciseId) {
                    return {
                        ...ex,
                        ...updatedExercise,
                    };
                }

                return ex;
            }) || [],
        );
    };

    const removeSelectedExercise = (exercise: FormWorkoutExercise) => {
        setData('exercises', data.exercises?.filter((ex) => ex.exercise_id !== exercise.exercise_id) || []);
        setAvailableExercises((prev) => [...prev, exercises.find((ex) => ex.id === exercise.exercise_id)!]);
    };

    const reSortExercises = (exercise: FormWorkoutExercise, oldOrder: number, newOrder: number) => {
        setData(
            'exercises',
            data.exercises?.map((ex) => {
                // if already on lowest or highest position, return the same
                if (newOrder < 1 || newOrder >= (data.exercises || []).length) {
                    return ex;
                }

                // change the order of the clicked exercise
                if (ex.exercise_id === exercise.exercise_id) {
                    console.log('reSortExercises', ex.order, oldOrder, newOrder);
                    return {
                        ...ex,
                        order: newOrder,
                    };
                }

                // change the sort order of the exercise that was swapped with the clicked exercise
                if (ex.order === newOrder) {
                    return {
                        ...ex,
                        order: oldOrder,
                    };
                }

                return ex;
            }) || [],
        );
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Card>
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Workout Name</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name ?? ''}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Workout Name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        {data.exercises && data.exercises.length > 0 && (
                            <div className="mb-2 flex flex-wrap gap-2">
                                {data.exercises.map((exercise) => (
                                    <Badge
                                        variant="secondary"
                                        key={exercise.exercise_id}
                                        className="flex cursor-pointer gap-1"
                                        onClick={() => removeSelectedExercise(exercise)}
                                    >
                                        {exercise.name}
                                        <XIcon className="h-3 w-3" />
                                    </Badge>
                                ))}
                            </div>
                        )}

                        <ExerciseSelection
                            removeAvailableExercise={removeAvailableExercise}
                            muscleGroups={muscleGroups}
                            addSelectedExercise={addSelectedExercise}
                            availableExercises={availableExercises}
                        />
                    </div>
                </CardContent>
            </Card>

            {data.exercises && data.exercises.length > 0 && (
                <Card>
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            {data.exercises
                                .sort((a, b) => a.order - b.order)
                                .map((selection) => (
                                    <ExerciseCard
                                        key={selection.exercise_id}
                                        selection={selection}
                                        removeSelectedExercise={removeSelectedExercise}
                                        updateSelectedExercise={updateSelectedExercise}
                                        numberOfExercises={data.exercises?.length ?? 0}
                                        reSortExercises={reSortExercises}
                                    />
                                ))}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="w-full space-y-4 border-t border-gray-200 pt-4">
                            {errors && Object.keys(errors).length > 0 && (
                                <p className="text-sm text-red-600">There was an error with your submission. Please check the form for errors.</p>
                            )}
                            <div>
                                <Button disabled={processing} type="submit">
                                    Save
                                </Button>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            )}
        </form>
    );
}
