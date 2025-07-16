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
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { WorkoutExercise, WorkoutExerciseSet } from '@/types/workouts';

interface Props {
    exercises: WorkoutExercise[];
}

export default function WorkoutExerciseTable({ exercises }: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Exercise</TableHead>
                    <TableHead>Sets</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {exercises &&
                    exercises.map((exercise) => (
                        <TableRow key={exercise.id}>
                            <TableCell>
                                <span className="flex h-full flex-col justify-center gap-1">
                                    <span>{exercise.exercise.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {exercise.exercise?.muscle_groups?.map((group) => group.name).join(', ')}
                                    </span>
                                </span>
                            </TableCell>
                            <TableCell>{exercise.sets.length}</TableCell>
                            <TableCell align="right">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button type="button" size="sm" variant="outline" className="ml-auto block">
                                            View Sets
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>{exercise.exercise.name}</DialogTitle>
                                            <DialogDescription>
                                                <span className="text-xs text-muted-foreground">
                                                    {exercise.exercise?.muscle_groups?.map((group) => group.name).join(', ')}
                                                </span>
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex flex-col gap-4">
                                            {exercise.sets.map((set, index) => (
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
                    ))}
            </TableBody>
        </Table>
    );
}

function Set({ exercise, set }: { exercise: WorkoutExercise; set: WorkoutExerciseSet }) {
    const minutes = Math.floor(set.duration_seconds ?? 0 / 60);
    const seconds = set.duration_seconds ?? 0 % 60;

    return (
        <div className="flex gap-1">
            {exercise.exercise.measurement === 'time' && (
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
            {exercise.exercise.measurement === 'distance' && (
                <div className="flex-1">
                    <span className="text-xs font-medium text-muted-foreground">Distance (meters)</span>
                    <Input disabled value={set.distance_meters || 0} />
                </div>
            )}
            {exercise.exercise.measurement === 'reps_only' && (
                <div className="flex-1">
                    <span className="text-xs font-medium text-muted-foreground">Reps</span>
                    <Input disabled value={set.reps || 0} />
                </div>
            )}
            {exercise.exercise.measurement === 'weight' && (
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
            {exercise.exercise.measurement === 'time_or_distance' && (
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
