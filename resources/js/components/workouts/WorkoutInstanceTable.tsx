import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { WorkoutInstance } from '@/types/workouts';
import { Fragment } from 'react';

export default function WorkoutInstanceTable({ instance }: { instance: WorkoutInstance }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Exercise</TableHead>
                    <TableHead>Set</TableHead>
                    <TableHead>Reps</TableHead>
                    <TableHead>Measurement</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {instance.exercises.map((exercise) => (
                    <Fragment key={exercise.id}>
                        {exercise.sets.map((set, index) => (
                            <TableRow
                                key={set.id}
                                className={index === exercise.sets.length - 1 ? 'border-b-2 border-slate-200' : 'border-slate-100'}
                            >
                                <TableCell className="py-5 font-medium">{index === 0 && exercise.exercise?.name}</TableCell>
                                <TableCell className="py-5 text-muted-foreground">{index + 1}</TableCell>
                                <TableCell className={`py-5 ${exercise.exercise.measurement === 'reps_only' ? 'font-medium' : ''}`}>
                                    {exercise.exercise.measurement === 'time_or_distance' || exercise.exercise.measurement === 'time' ? (
                                        <span>-</span>
                                    ) : (
                                        set.reps
                                    )}
                                </TableCell>
                                <TableCell className="py-5 font-medium">
                                    {exercise.exercise.measurement === 'reps_only' ? (
                                        <span>-</span>
                                    ) : exercise.exercise.measurement === 'weight' ? (
                                        <Weight weight={set.weight} />
                                    ) : exercise.exercise.measurement === 'time' ? (
                                        <Time time={set.duration_seconds} />
                                    ) : exercise.exercise.measurement === 'time_or_distance' ? (
                                        set.duration_seconds ? (
                                            <Time time={set.duration_seconds} />
                                        ) : (
                                            <Distance distance={set.distance_meters} />
                                        )
                                    ) : (
                                        ''
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </Fragment>
                ))}
            </TableBody>
        </Table>
    );
}

function Weight({ weight }: { weight?: number | null }) {
    return weight ? weight + ' kg' : null;
}

function Time({ time }: { time?: number | null }) {
    const minutes = Math.floor((time || 0) / 60);
    const seconds = (time || 0) % 60;
    if (minutes > 0) {
        return `${minutes} minutes, ${seconds} seconds`;
    }
    if (seconds > 0) {
        return `${seconds} seconds`;
    }

    return null;
}

function Distance({ distance }: { distance?: number | null }) {
    return distance ? distance + ' meters' : null;
}
