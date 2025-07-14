import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { v4 as uuidv4 } from 'uuid';
import { WorkoutExercise } from './CreateWorkoutForm';
import ExerciseSet from './ExerciseSet';

interface Props {
    selection: WorkoutExercise;
    updateSelectedExercise: (exerciseId: number, updatedExercise: Partial<WorkoutExercise>) => void;
}

export default function ExerciseSets({ selection, updateSelectedExercise }: Props) {
    const addSet = () => {
        updateSelectedExercise(selection.exercise_id, {
            sets: [...selection.sets, { id: uuidv4(), order: (selection.sets[selection.sets.length - 1]?.order ?? 0) + 1 }],
        });
    };

    return (
        <Card className="bg-slate-50/60">
            <CardContent>
                <div className="flex flex-col gap-4">
                    {selection.sets && selection.sets.length > 0 ? (
                        selection.sets.map((set, index: number) => (
                            <ExerciseSet key={set.id} set={set} index={index} updateSelectedExercise={updateSelectedExercise} selection={selection} />
                        ))
                    ) : (
                        <p className="text-sm font-medium text-muted-foreground">No sets created</p>
                    )}
                    <Button variant="ghost" className="max-w-max" type="button" onClick={addSet}>
                        Add Set
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
