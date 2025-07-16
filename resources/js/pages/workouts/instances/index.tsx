import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import WorkoutHistoryTable from '@/components/workouts/WorkoutHistoryTable';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { WorkoutInstance } from '@/types/workouts';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

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
    instances: WorkoutInstance[];
}

export default function WorkoutInstances({ instances }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Workout History`} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="flex flex-row items-center justify-between gap-2 px-2 pt-6 pb-2">
                    <HeadingSmall title={`Workout History`} description="A list of time you have performed this workout." />
                    <div className="flex items-center gap-2">
                        <Button asChild size="sm" variant="secondary">
                            <Link href={`/workouts`}>
                                <ArrowLeft />
                                Back to Workouts
                            </Link>
                        </Button>
                    </div>
                </div>
                <Card>
                    <CardContent>
                        <WorkoutHistoryTable instances={instances} all />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
