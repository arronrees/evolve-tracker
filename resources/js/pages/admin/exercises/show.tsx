import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

import DeleteExercise from '@/components/admin/DeleteExercise';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    measurement: 'reps_only' | 'weight' | 'time' | 'distance' | 'time_or_distance';
}

interface Props {
    exercise: Exercise;
}

export default function AdminExerciseShow({ exercise }: Props) {
    const { data, setData, put, errors } = useForm<Required<ExerciseForm>>({
        name: exercise.name,
        description: exercise.description,
        measurement: exercise.measurement,
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
                            <Label htmlFor="measurement">Measurement</Label>

                            <Select
                                onValueChange={(value) =>
                                    setData('measurement', value as 'reps_only' | 'weight' | 'time' | 'distance' | 'time_or_distance')
                                }
                                value={data.measurement}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select measurement" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="reps_only">Reps Only</SelectItem>
                                    <SelectItem value="weight">Weight</SelectItem>
                                    <SelectItem value="time">Time</SelectItem>
                                    <SelectItem value="distance">Distance</SelectItem>
                                    <SelectItem value="time_or_distance">Time or Distance</SelectItem>
                                </SelectContent>
                            </Select>

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
