import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WorkoutExerciseTable from '@/components/workouts/WorkoutExerciseTable';
import WorkoutHistoryTable from '@/components/workouts/WorkoutHistoryTable';
import AppLayout from '@/layouts/app-layout';
import { mapBreadcrumbs } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { type Workout, WorkoutInstance } from '@/types/workouts';
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

interface ShowWorkout extends Workout {
    instances: WorkoutInstance[];
}

interface Props {
    workout: ShowWorkout;
}

export default function Workout({ workout }: Props) {
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
                        <CardTitle>Workout details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <WorkoutExerciseTable exercises={workout.exercises} />
                    </CardContent>
                </Card>

                <div className="flex items-center justify-between gap-2 px-2 pt-6 pb-2">
                    <HeadingSmall title="Workout History" description="Times you have completed this workout" />
                    <div>
                        <Button asChild size="sm">
                            <Link href={`/workouts/${workout.id}/history`}>View All</Link>
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent workouts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <WorkoutHistoryTable instances={workout.instances} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
