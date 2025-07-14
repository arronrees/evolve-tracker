import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp, XIcon } from 'lucide-react';
import { WorkoutExercise } from './CreateWorkoutForm';
import ExerciseSets from './ExerciseSets';

interface Props {
    selection: WorkoutExercise;
    removeSelectedExercise: (exercise: WorkoutExercise) => void;
    updateSelectedExercise: (exerciseId: number, updatedExercise: Partial<WorkoutExercise>) => void;
    numberOfExercises: number;
    reSortExercises: (exercise: WorkoutExercise, oldOrder: number, newOrder: number) => void;
}

export default function ExerciseCard({ selection, removeSelectedExercise, updateSelectedExercise, numberOfExercises, reSortExercises }: Props) {
    return (
        <Card className="gap-4">
            <CardHeader>
                <div className="flex items-end justify-between gap-2">
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
            </CardHeader>
            <CardContent>
                <ExerciseSets selection={selection} updateSelectedExercise={updateSelectedExercise} />
            </CardContent>
            <CardFooter>
                <Button
                    variant="ghost"
                    type="button"
                    onClick={() => {
                        removeSelectedExercise(selection);
                    }}
                    className="ml-auto flex h-auto items-center gap-2 p-2 text-xs"
                >
                    Remove Exercise
                    <XIcon className="h-3 w-3" />
                </Button>
            </CardFooter>
        </Card>
    );
}
