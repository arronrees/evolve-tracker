import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { ExerciseHistory } from '@/pages/exercises';
import { WorkoutExerciseSetInstance } from '@/types/workouts';
import { Link } from '@inertiajs/react';

interface Props {
    exercise: ExerciseHistory;
}

const calculateWeight = (sets: WorkoutExerciseSetInstance[]): number => {
    if (!sets || sets.length <= 0) return 0;

    return sets.reduce((total, set) => {
        return total + (set.reps || 0) * (set.weight || 0);
    }, 0);
};

const calculatePercentage = (original: number, newNum: number) => {
    return ((newNum - original) / original) * 100;
};

export default function ExercisesTableRow({ exercise }: Props) {
    const latestWeight = calculateWeight(exercise.workout_exercise_instances[0]?.sets);
    const previousWeight = calculateWeight(exercise.workout_exercise_instances[1]?.sets);
    const percentageDifference = calculatePercentage(previousWeight, latestWeight);

    return (
        <TableRow>
            <TableCell className="py-3.5">
                <Link href={`/exercises/${exercise.id}`}>{exercise.name}</Link>
            </TableCell>
            <TableCell className="py-3.5">
                <span className="flex items-center gap-1.5 text-sm">
                    <span className="font-semibold">{exercise.measurement === 'weight' ? `${latestWeight}kg` : '-'}</span>
                    {Number(percentageDifference) && isFinite(percentageDifference) ? (
                        Number(percentageDifference) > 0 ? (
                            <span className="rounded bg-green-100 px-1.5 py-1 text-green-900">+{Number(percentageDifference).toFixed(2)}%</span>
                        ) : (
                            <span className="rounded bg-red-50 px-1.5 py-1 text-red-700">-{Number(percentageDifference).toFixed(2)}%</span>
                        )
                    ) : (
                        ''
                    )}
                </span>
            </TableCell>
            <TableCell className="py-3.5">
                <span className="text-muted-foreground">{exercise.measurement === 'weight' ? `${previousWeight}kg` : '-'}</span>
            </TableCell>
            <TableCell className="py-3.5"></TableCell>
            <TableCell className="py-3.5" align="right">
                <Button asChild size="sm" variant="outline">
                    <Link href={`/exercises/${exercise.id}`}>View</Link>
                </Button>
            </TableCell>
        </TableRow>
    );
}
