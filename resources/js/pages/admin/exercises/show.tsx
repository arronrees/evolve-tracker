import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

import DeleteExercise from '@/components/admin/DeleteExercise';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Exercise } from '@/types/workouts';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Exercises',
        href: '/admin/exercises',
    },
];

interface ExerciseForm {
    name: string;
    description: string | null;
}

interface Props {
    exercise: Exercise;
}

export default function AdminExerciseShow({ exercise }: Props) {
    const { data, setData, put, errors } = useForm<Required<ExerciseForm>>({
        name: exercise.name,
        description: exercise.description,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('admin.exercises.update', exercise.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update Exercise" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Update Exercise" description="Update the exercise" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                placeholder="Exercise name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>

                            <Textarea
                                id="description"
                                className="mt-1 block w-full"
                                value={data.description ?? ''}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Exercise description"
                            />

                            <InputError className="mt-2" message={errors.description} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="submit">Save</Button>
                        </div>
                    </form>

                    <div>
                        <DeleteExercise exerciseId={exercise.id} />
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
