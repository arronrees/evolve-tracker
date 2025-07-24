import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { MuscleGroup } from '@/types/workouts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Muscle Groups',
        href: '/admin/muscle-groups',
    },
];

interface Props {
    muscleGroups: MuscleGroup[];
}

export default function AdminMuscleGroups({ muscleGroups }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Muscle Groups" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Muscle Groups" description="Update the muscle groups available on the site" />

                    <div>
                        <Button asChild size="sm">
                            <Link href="/admin/muscle-groups/create">Add Muscle Group</Link>
                        </Button>
                    </div>

                    <ul className="flex flex-col gap-1.5">
                        {muscleGroups.map((group) => (
                            <li key={group.id} className="">
                                <Link
                                    href={`/admin/muscle-groups/${group.id}`}
                                    className="block rounded bg-slate-50 p-2 transition hover:bg-slate-100 focus:bg-slate-100"
                                >
                                    {group.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
