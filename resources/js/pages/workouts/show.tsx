import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import AppLayout from '@/layouts/app-layout';
import { mapBreadcrumbs } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Workout, WorkoutExercise, WorkoutExerciseSet } from '@/types/workouts';
import { Head, Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Workouts',
        href: '/workouts',
    },
    {
        title: '{name}',
        href: '/workouts/{id}',
    },
];

interface Props {
    workout: Workout;
}

export default function Workouts({ workout }: Props) {
    return (
        <AppLayout
            breadcrumbs={mapBreadcrumbs(breadcrumbs, [{ find: '{id}', replace: workout.id.toString() }], [{ find: '{name}', replace: workout.name }])}
        >
            <Head title={workout.name} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="flex items-center justify-between gap-2 px-2 pt-6 pb-2">
                    <HeadingSmall title={workout.name} description={workout.description ?? ''} />
                    <div className="flex items-center gap-2">
                        <Button asChild size="sm" variant="secondary">
                            <Link href={`/workouts/${workout.id}/edit`}>Edit</Link>
                        </Button>
                        <Button asChild size="sm">
                            <Link href={`/workouts/${workout.id}/start`}>
                                Start Workout
                                <ArrowUpRight />
                            </Link>
                        </Button>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Workout Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Exercise</TableHead>
                                    <TableHead>Sets</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {workout.exercises &&
                                    workout.exercises.map((exercise) => (
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
                                                        <Button type="button" variant="outline" className="ml-auto block">
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
                                                                <Button type="button" variant="secondary">
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
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
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
