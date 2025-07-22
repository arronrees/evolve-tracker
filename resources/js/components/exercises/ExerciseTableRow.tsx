import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { ExerciseHistory } from '@/pages/exercises/show';
import { Exercise, WorkoutExerciseInstance, WorkoutExerciseSet, WorkoutExerciseSetInstance } from '@/types/workouts';
import { Link } from '@inertiajs/react';
import { Input } from '../ui/input';

interface Props {
    instance: WorkoutExerciseInstance;
    exercise: ExerciseHistory;
    index: number;
}

const calculateWeight = (sets: WorkoutExerciseSetInstance[] | WorkoutExerciseSet[]): number => {
    if (!sets || sets.length <= 0) return 0;

    return sets.reduce((total, set) => {
        return total + (set.reps || 0) * (set.weight || 0);
    }, 0);
};

const calculatePercentage = (original: number, newNum: number) => {
    return ((newNum - original) / original) * 100;
};

export default function ExerciseTableRow({ instance, exercise, index }: Props) {
    const latestWeight = calculateWeight(instance.sets);
    const previousWeight =
        index + 1 > exercise.workout_exercise_instances.length ? null : calculateWeight(exercise.workout_exercise_instances[index + 1]?.sets);
    const targetWeight = calculateWeight(instance.workout.workout.exercises[0].sets);
    const percentageDifferenceFromPrevious = previousWeight ? calculatePercentage(previousWeight, latestWeight) : null;
    const percentageDifferenceFromTarget = targetWeight ? calculatePercentage(targetWeight, latestWeight) : null;

    return (
        <TableRow>
            <TableCell className="py-3.5">
                <span className="flex flex-col">
                    <Link href={`/workouts/${instance.workout.workout_id}/history/${instance.workout_instance_id}`} className="font-medium">
                        {instance.workout.workout.name}
                    </Link>
                    <span className="text-xs text-muted-foreground">{new Date(instance.workout.created_at).toDateString()}</span>
                </span>
            </TableCell>
            <TableCell>{instance.sets.reduce((total, set) => total + (set.reps || 0), 0)}</TableCell>
            <TableCell className="py-3.5">
                <span className="font-semibold">{latestWeight}kg</span>
            </TableCell>
            <TableCell className="py-3.5">
                <span className="text-xs">
                    {Number(percentageDifferenceFromPrevious) ? (
                        Number(percentageDifferenceFromPrevious) > 0 ? (
                            <span className="rounded bg-green-100 px-1.5 py-1 text-green-900">
                                +{Number(percentageDifferenceFromPrevious).toFixed(2)}%
                            </span>
                        ) : (
                            <span className="rounded bg-red-50 px-1.5 py-1 text-red-700">{Number(percentageDifferenceFromPrevious).toFixed(2)}%</span>
                        )
                    ) : (
                        ''
                    )}
                </span>
            </TableCell>
            <TableCell className="py-3.5">
                <span className="text-xs">
                    {Number(percentageDifferenceFromTarget) ? (
                        Number(percentageDifferenceFromTarget) > 0 ? (
                            <span className="rounded bg-green-100 px-1.5 py-1 text-green-900">
                                +{Number(percentageDifferenceFromTarget).toFixed(2)}%
                            </span>
                        ) : (
                            <span className="rounded bg-red-50 px-1.5 py-1 text-red-700">{Number(percentageDifferenceFromTarget).toFixed(2)}%</span>
                        )
                    ) : (
                        ''
                    )}
                </span>
            </TableCell>
            <TableCell className="py-3.5" align="right">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button type="button" size="sm" variant="outline" className="ml-auto block">
                            View Sets
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{exercise.name}</DialogTitle>
                            <DialogDescription>
                                <span className="text-xs text-muted-foreground">{exercise.muscle_groups?.map((group) => group.name).join(', ')}</span>
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-4">
                            {instance.sets.map((set, index) => (
                                <div key={set.id}>
                                    <h3 className="text-sm font-semibold">Set {index + 1}</h3>
                                    <Set exercise={exercise} set={set} />
                                </div>
                            ))}
                        </div>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" size="sm">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </TableCell>
        </TableRow>
    );
}

function Set({ exercise, set }: { exercise: Exercise; set: WorkoutExerciseSetInstance }) {
    const minutes = Math.floor(set.duration_seconds ?? 0 / 60);
    const seconds = set.duration_seconds ?? 0 % 60;

    return (
        <div className="flex gap-1">
            {exercise.measurement === 'time' && (
                <div className="flex flex-1 items-center gap-1">
                    <div className="w-full">
                        <span className="text-xs font-medium text-muted-foreground">Minutes</span>
                        <Input disabled value={minutes} />
                    </div>
                    <div className="w-full">
                        <span className="text-xs font-medium text-muted-foreground">Seconds</span>
                        <Input disabled value={seconds} />
                    </div>
                </div>
            )}
            {exercise.measurement === 'distance' && (
                <div className="flex-1">
                    <span className="text-xs font-medium text-muted-foreground">Distance (meters)</span>
                    <Input disabled value={set.distance_meters || 0} />
                </div>
            )}
            {exercise.measurement === 'reps_only' && (
                <div className="flex-1">
                    <span className="text-xs font-medium text-muted-foreground">Reps</span>
                    <Input disabled value={set.reps || 0} />
                </div>
            )}
            {exercise.measurement === 'weight' && (
                <>
                    <div className="flex-1">
                        <span className="text-xs font-medium text-muted-foreground">Reps</span>
                        <Input disabled value={set.reps || 0} />
                    </div>
                    <div className="flex-1">
                        <span className="text-xs font-medium text-muted-foreground">Weight (kg)</span>
                        <Input disabled value={set.weight || 0} />
                    </div>
                </>
            )}
            {exercise.measurement === 'time_or_distance' && (
                <>
                    {set.duration_seconds && (
                        <div className="flex flex-1 items-center gap-1">
                            <div className="w-full">
                                <span className="text-xs font-medium text-muted-foreground">Minutes</span>
                                <Input disabled value={minutes} />
                            </div>
                            <div className="w-full">
                                <span className="text-xs font-medium text-muted-foreground">Seconds</span>
                                <Input disabled value={seconds} />
                            </div>
                        </div>
                    )}
                    {set.distance_meters && (
                        <div className="flex-1">
                            <span className="text-xs font-medium text-muted-foreground">Distance (meters)</span>
                            <Input disabled value={set.distance_meters || 0} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
