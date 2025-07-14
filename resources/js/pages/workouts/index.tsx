import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Workouts',
        href: '/workouts',
    },
];

export default function Workouts() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between gap-2">
                        <div>
                            <CardTitle>My Workouts</CardTitle>
                            <CardDescription>A list of workouts you have created.</CardDescription>
                        </div>
                        <Button asChild size="sm">
                            <Link href="/workouts/create">
                                Create New Workout
                                <ArrowUpRight />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent></CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
