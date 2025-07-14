import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import CreateWorkoutForm from '@/components/workouts/CreateWorkoutForm';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Exercise, MuscleGroup } from '@/types/workouts';
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
        title: 'Create Workout',
        href: '/workouts/create',
    },
];

interface Props {
    exercises: Exercise[];
    muscleGroups: MuscleGroup[];
}

export default function CreateWorkout({ exercises, muscleGroups }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-row items-center justify-between gap-2 px-2 pt-8 pb-2">
                    <HeadingSmall title="Create Workout" description="Add your excerises and create your workout" />
                    <div>
                        <Button asChild size="sm">
                            <Link href="/workouts/create">
                                Create New Workout
                                <ArrowUpRight />
                            </Link>
                        </Button>
                    </div>
                </div>

                <CreateWorkoutForm exercises={exercises} muscleGroups={muscleGroups} />
            </div>
        </AppLayout>
    );
}
