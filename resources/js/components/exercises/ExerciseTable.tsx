import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ExerciseHistory } from '@/pages/exercises';
import ExerciseTableRow from './ExerciseTableRow';

interface Props {
    exercises: ExerciseHistory[];
}

export default function ExerciseTable({ exercises }: Props) {
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
            <TableBody>{exercises && exercises.map((exercise) => <ExerciseTableRow key={exercise.id} exercise={exercise} />)}</TableBody>
        </Table>
    );
}
