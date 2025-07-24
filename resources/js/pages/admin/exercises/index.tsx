import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Exercise } from '@/types/workouts';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Exercises',
        href: '/admin/exercises',
    },
];

interface Props {
    exercises: Exercise[];
}

export default function AdminExercises({ exercises }: Props) {
    const [filteredExercises, setFilteredExercises] = useState<Exercise[]>(exercises);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Exercises" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Exercises" description="Update the exercises available on the site" />

                    <div>
                        <Button asChild size="sm">
                            <Link href="/admin/exercises/create">Add Exercise</Link>
                        </Button>
                    </div>

                    <div>
                        <label htmlFor="filter" className="mb-1 block">
                            Filter exercises
                        </label>
                        <input
                            id="filter"
                            name="filter"
                            type="text"
                            className="block w-full rounded border border-slate-200 bg-slate-100 p-2 ring-slate-100 outline-none focus:border-slate-400 focus:ring-2"
                            onChange={(e) => {
                                setFilteredExercises(
                                    exercises.filter((ex) =>
                                        ex.name.toLowerCase().replaceAll(' ', '').includes(e.target.value.toLowerCase().replaceAll(' ', '')),
                                    ),
                                );
                            }}
                        />
                    </div>

                    <ul className="flex flex-col gap-1.5">
                        {filteredExercises.map((exercise) => (
                            <li key={exercise.id} className="">
                                <Link
                                    href={`/admin/exercises/${exercise.id}`}
                                    className="flex items-center gap-4 rounded bg-slate-50 p-2 transition hover:bg-slate-100 focus:bg-slate-100"
                                >
                                    <span>{exercise.name}</span>
                                    <span>
                                        {exercise.muscle_groups.map((muscleGroup) => (
                                            <Badge key={muscleGroup.id}>{muscleGroup.name}</Badge>
                                        ))}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
