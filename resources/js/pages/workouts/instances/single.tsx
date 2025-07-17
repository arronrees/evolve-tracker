import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import WorkoutHistoryTable from '@/components/workouts/WorkoutHistoryTable';
import AppLayout from '@/layouts/app-layout';
import { mapBreadcrumbs } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Workout, WorkoutInstance } from '@/types/workouts';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

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
    {
        title: 'History',
        href: '/workouts/{id}/history',
    },
];

interface Props {
    instances: WorkoutInstance[];
    workout: Workout;
}

export default function WorkoutInstances({ workout, instances }: Props) {
    return (
        <AppLayout
            breadcrumbs={mapBreadcrumbs(breadcrumbs, [{ find: '{id}', replace: workout.id.toString() }], [{ find: '{name}', replace: workout.name }])}
        >
            <Head title={`Workout History - ${workout.name}`} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="flex flex-row items-center justify-between gap-2 px-2 pt-6 pb-2">
                    <HeadingSmall title={`Workout History - ${workout.name}`} description="A list of time you have performed this workout." />
                    <div className="flex items-center gap-2">
                        <Button asChild size="sm" variant="secondary">
                            <Link href={`/workouts/${workout.id}`}>
                                <ArrowLeft />
                                Back to Workout
                            </Link>
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
                    <CardContent>
                        <WorkoutHistoryTable instances={instances} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
