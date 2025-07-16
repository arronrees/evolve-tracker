import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import WorkoutInstanceTable from '@/components/workouts/WorkoutInstanceTable';
import AppLayout from '@/layouts/app-layout';
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
];

interface Props {
    instance: WorkoutInstance;
    workout: Workout;
}

export default function ShowWorkoutInstance({ workout, instance }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Workout Instance - ${workout.name}`} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="flex flex-row items-center justify-between gap-2 px-2 pt-6 pb-2">
                    <HeadingSmall title={`Workout Instance - ${workout.name}`} description={`${new Date(instance.created_at).toDateString()}`} />
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
                        <WorkoutInstanceTable instance={instance} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
