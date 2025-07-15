import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import RecordWorkoutForm from '@/components/workouts/RecordWorkoutForm';
import AppLayout from '@/layouts/app-layout';
import { mapBreadcrumbs } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Exercise, MuscleGroup, Workout } from '@/types/workouts';
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
    {
        title: '{name}',
        href: '/workouts/{id}',
    },
    {
        title: 'Record Workout',
        href: '/workouts/{workout}/start',
    },
];

interface Props {
    workout: Workout;
    exercises: Exercise[];
    muscleGroups: MuscleGroup[];
}

export default function StartWorkout({ workout, exercises, muscleGroups }: Props) {
    return (
        <AppLayout
            breadcrumbs={mapBreadcrumbs(breadcrumbs, [{ find: '{id}', replace: workout.id.toString() }], [{ find: '{name}', replace: workout.name }])}
        >
            <Head title="Record Workout" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="flex flex-row items-center justify-between gap-2 px-2 pt-6 pb-2">
                    <HeadingSmall title="Record Workout" description="Add your sets and reps and save your progress." />
                    <div>
                        <Button asChild size="sm" variant="secondary">
                            <Link href={`/workouts/${workout.id}`}>
                                <ArrowLeft />
                                Back To Workout
                            </Link>
                        </Button>
                    </div>
                </div>

                <RecordWorkoutForm exercises={exercises} muscleGroups={muscleGroups} workout={workout} />
            </div>
        </AppLayout>
    );
}
