import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Exercise, MuscleGroup } from '@/types/workouts';
import { ChevronsUpDown, XIcon } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Muscle Groups',
        href: '/admin/muscle-groups',
    },
];

interface MuscleGroupForm {
    name: string;
    description: string | null;
    exercises?: { id: number; name: string }[];
}

interface Props {
    muscleGroup: MuscleGroup;
    exercises: Exercise[];
}

export default function AdminMuscleGroupShow({ muscleGroup, exercises }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [availableExercises, setAvailableExercises] = useState<Exercise[]>(exercises);

    const { data, setData, put, errors } = useForm<Required<MuscleGroupForm>>({
        name: muscleGroup.name,
        description: muscleGroup.description,
        exercises: [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('admin.muscle-groups.update', muscleGroup.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update Muscle Group" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Update Muscle Group" description="Update the muscle group" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                placeholder="Muscle group name"
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
                                placeholder="Muscle group description"
                            />

                            <InputError className="mt-2" message={errors.description} />
                        </div>

                        <div>
                            {data.exercises && data.exercises.length > 0 && (
                                <div className="mb-2 flex flex-wrap gap-2">
                                    {data.exercises.map((exercise) => (
                                        <Badge
                                            variant="secondary"
                                            key={exercise.id}
                                            className="flex cursor-pointer gap-1"
                                            onClick={() => {
                                                setData('exercises', data.exercises?.filter((ex) => ex.id !== exercise.id) || []);
                                                setAvailableExercises((prev) => [...prev, exercises.find((ex) => ex.id === exercise.id)!]);
                                            }}
                                        >
                                            {exercise.name}
                                            <XIcon className="h-3 w-3" />
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" role="combobox" aria-expanded={open} className="w-full max-w-full justify-between">
                                        Select exercises...
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="PopoverContent w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search exercises..." />
                                        <CommandEmpty>No exercises found.</CommandEmpty>
                                        <CommandList>
                                            {availableExercises &&
                                                availableExercises.map((exercise) => (
                                                    <CommandItem
                                                        key={exercise.id}
                                                        value={exercise.name}
                                                        onSelect={() => {
                                                            setData('exercises', [
                                                                ...(data.exercises || []),
                                                                {
                                                                    id: exercise.id,
                                                                    name: exercise.name,
                                                                },
                                                            ]);

                                                            setAvailableExercises((prev) => prev.filter((ex) => ex.id !== exercise.id));
                                                        }}
                                                    >
                                                        {exercise.name}
                                                    </CommandItem>
                                                ))}
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="submit">Save</Button>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
