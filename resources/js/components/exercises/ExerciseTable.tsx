import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ExerciseHistory } from '@/pages/exercises';
import ExerciseTableRow from './ExerciseTableRow';

interface Props {
    exercise: ExerciseHistory;
}

export default function ExerciseTable({ exercise }: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Workout</TableHead>
                    <TableHead>Reps</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>vs Previous</TableHead>
                    <TableHead>vs Target</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {exercise.workout_exercise_instances &&
                    exercise.workout_exercise_instances.map((instance, index) => (
                        <ExerciseTableRow key={instance.id} instance={instance} exercise={exercise} index={index} />
                    ))}
            </TableBody>
        </Table>
    );
}
