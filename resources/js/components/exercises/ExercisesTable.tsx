import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ExerciseHistory } from '@/pages/exercises';
import ExercisesTableRow from './ExercisesTableRow';

interface Props {
    exercises: ExerciseHistory[];
}

export default function ExercisesTable({ exercises }: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Latest workout</TableHead>
                    <TableHead>Previous workout</TableHead>
                    <TableHead>PB</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>{exercises && exercises.map((exercise) => <ExercisesTableRow key={exercise.id} exercise={exercise} />)}</TableBody>
        </Table>
    );
}
