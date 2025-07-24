import { User, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/admin/users',
    },
];

interface Props {
    users: User[];
}

export default function AdminUsers({ users }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Users" description="View and manage users" />

                    <ul className="flex flex-col gap-1.5">
                        {users.map((user) => (
                            <li key={user.id} className="">
                                <Link
                                    href={`/admin/users/${user.id}`}
                                    className="block rounded bg-slate-50 p-2 transition hover:bg-slate-100 focus:bg-slate-100"
                                >
                                    {user.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
