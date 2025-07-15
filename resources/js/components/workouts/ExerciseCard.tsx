import { Button } from '@/components/ui/button';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { FormWorkoutExercise, Workout } from '@/types/workouts';
import { ChevronDown, ChevronUp, XIcon } from 'lucide-react';
import ExerciseSets from './ExerciseSets';

interface Props {
    selection: FormWorkoutExercise;
    removeSelectedExercise: (exercise: FormWorkoutExercise) => void;
    updateSelectedExercise: (exerciseId: number, updatedExercise: Partial<FormWorkoutExercise>) => void;
    numberOfExercises: number;
    reSortExercises: (exercise: FormWorkoutExercise, oldOrder: number, newOrder: number) => void;
    workout?: Workout;
}

export default function ExerciseCard({
    selection,
    removeSelectedExercise,
    updateSelectedExercise,
    numberOfExercises,
    reSortExercises,
    workout,
}: Props) {
    return (
        <div className="gap-4">
            <div className="flex items-end justify-between gap-2 p-2">
                <div>
                    <CardTitle className="text-sm">{selection.name}</CardTitle>
                    <CardDescription className="text-xs">Add sets and reps</CardDescription>
                </div>
                <div className="flex gap-1">
                    {selection.order > 1 && (
                        <Button
                            variant="outline"
                            className="h-max max-w-max p-2"
                            type="button"
                            onClick={() => {
                                reSortExercises(selection, selection.order, selection.order - 1);
                            }}
                        >
                            <ChevronUp className="h-3 w-3" />
                        </Button>
                    )}
                    {selection.order !== numberOfExercises && (
                        <Button
                            variant="outline"
                            className="h-max max-w-max p-2"
                            type="button"
                            onClick={() => {
                                reSortExercises(selection, selection.order, selection.order + 1);
                            }}
                        >
                            <ChevronDown className="h-3 w-3" />
                        </Button>
                    )}
                </div>
            </div>

            <ExerciseSets selection={selection} updateSelectedExercise={updateSelectedExercise} workout={workout} />

            <Button
                variant="ghost"
                type="button"
                onClick={() => {
                    removeSelectedExercise(selection);
                }}
                className="mt-2 ml-auto flex h-auto items-center gap-2 p-2 text-xs"
            >
                Remove Exercise
                <XIcon className="h-3 w-3" />
            </Button>
        </div>
    );
}
