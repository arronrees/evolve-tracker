import ExerciseTable from '@/components/exercises/ExerciseTable';
import HeadingSmall from '@/components/heading-small';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Exercise, WorkoutExerciseInstance } from '@/types/workouts';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Exercises',
        href: '/workouts',
    },
];

export interface ExerciseHistory extends Exercise {
    workout_exercise_instances: WorkoutExerciseInstance[];
}

interface Props {
    exercises: ExerciseHistory[];
}

export default function Exercises({ exercises }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Exercises" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="flex flex-row items-center justify-between gap-2 px-2 pt-6 pb-2">
                    <HeadingSmall title="Exercises" description="Here shows the progress of all the exercises you have performed." />
                </div>
                <Card>
                    <CardContent>
                        <ExerciseTable exercises={exercises} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
