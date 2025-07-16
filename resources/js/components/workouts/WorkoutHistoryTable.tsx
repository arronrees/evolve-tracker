import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { WorkoutInstance } from '@/types/workouts';
import { Link } from '@inertiajs/react';

interface Props {
    instances: WorkoutInstance[];
    all?: boolean;
}

export default function WorkoutHistoryTable({ instances, all }: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    {all && <TableHead>Workout</TableHead>}
                    <TableHead>Weight Lifted</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {instances &&
                    instances.map((instance) => (
                        <TableRow key={instance.id}>
                            <TableCell>{new Date(instance.created_at).toDateString()}</TableCell>
                            {all && (
                                <TableCell>
                                    <span className="font-semibold">
                                        <Link href={`/workouts/${instance.workout_id}`}>{instance.workout.name}</Link>
                                    </span>
                                </TableCell>
                            )}
                            <TableCell>
                                <WeightLiftedCell instance={instance} />
                            </TableCell>
                            <TableCell align="right">
                                <Button asChild size="sm" variant="outline">
                                    <Link href={`/workouts/${instance.workout_id}/history/${instance.id}`}>View</Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
}

function WeightLiftedCell({ instance }: { instance: WorkoutInstance }) {
    const totalWeight = instance.exercises.reduce((total, exercise) => {
        return total + exercise.sets.reduce((setTotal, set) => setTotal + (set.weight || 0) * (set.reps || 0), 0);
    }, 0);

    return <span>{totalWeight} kg</span>;
}
