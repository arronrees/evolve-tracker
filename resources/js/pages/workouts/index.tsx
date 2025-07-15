import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Workout } from '@/types/workouts';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Workouts',
        href: '/workouts',
    },
];

interface Props {
    workouts: Workout[];
}

export default function Workouts({ workouts }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="flex flex-row items-center justify-between gap-2 px-2 pt-6 pb-2">
                    <HeadingSmall title="My Workouts" description="A list of workouts you have created." />
                    <div>
                        <Button asChild size="sm">
                            <Link href="/workouts/create">Create New Workout</Link>
                        </Button>
                    </div>
                </div>
                <Card>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>No. of Exercises</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {workouts &&
                                    workouts.map((workout) => (
                                        <TableRow key={workout.id}>
                                            <TableCell>
                                                <Link href={`/workouts/${workout.id}`}>{workout.name}</Link>
                                            </TableCell>
                                            <TableCell>{workout.exercises.length}</TableCell>
                                            <TableCell align="right">
                                                <div className="ml-auto flex items-center justify-end gap-2">
                                                    <Button asChild variant="ghost" size="sm">
                                                        <Link href={`/workouts/${workout.id}/edit`}>Edit</Link>
                                                    </Button>
                                                    <Button asChild variant="outline">
                                                        <Link href={`/workouts/${workout.id}`}>View</Link>
                                                    </Button>
                                                    <Button asChild size="sm">
                                                        <Link href={`/workouts/${workout.id}/start`}>Start</Link>
                                                    </Button>
                                                </div>
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
