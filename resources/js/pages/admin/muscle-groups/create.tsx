import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Muscle Groups',
        href: '/admin/muscle-groups',
    },
];

interface MuscleGroupForm {
    name: string;
    description: string;
}

export default function AdminMuscleGroupCreate() {
    const { data, setData, post, errors } = useForm<Required<MuscleGroupForm>>({
        name: '',
        description: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('admin.muscle-groups.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Muscle Group" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Create Muscle Group" description="Add a new muscle group to the site" />

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
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Muscle group description"
                            />

                            <InputError className="mt-2" message={errors.description} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="submit">Add</Button>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
