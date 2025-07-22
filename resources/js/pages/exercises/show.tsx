import ExerciseTable from '@/components/exercises/ExerciseTable';
import HeadingSmall from '@/components/heading-small';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { mapBreadcrumbs } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { type Exercise, WorkoutExerciseInstance } from '@/types/workouts';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Exercises',
        href: '/exercises',
    },
    {
        title: '{name}',
        href: '/exercises/{id}',
    },
];

export interface ExerciseHistory extends Exercise {
    workout_exercise_instances: WorkoutExerciseInstance[];
}

interface Props {
    exercise: ExerciseHistory;
}

export default function Exercise({ exercise }: Props) {
    return (
        <AppLayout
            breadcrumbs={mapBreadcrumbs(
                breadcrumbs,
                [{ find: '{id}', replace: exercise.id.toString() }],
                [{ find: '{name}', replace: exercise.name }],
            )}
        >
            <Head title={exercise.name} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="flex flex-row items-center justify-between gap-2 px-2 pt-6 pb-2">
                    <HeadingSmall title={exercise.name} description="Here shows the progress of this exercise." />
                </div>
                <Card>
                    <CardContent>
                        <ExerciseTable exercise={exercise} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
