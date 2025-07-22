import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Dumbbell, Repeat2, Weight } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Props {
    weight: number;
    sets: number;
    reps: number;
}

export default function Dashboard({ weight, sets, reps }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-xs font-normal tracking-wider text-muted-foreground uppercase">Total Volume Lifted</CardTitle>
                            <Weight className="size-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl tracking-wider md:text-3xl lg:text-4xl xl:text-5xl">
                                <span>{new Intl.NumberFormat('en-GB').format(weight)} kg</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-xs font-normal tracking-wider text-muted-foreground uppercase">Sets Completed</CardTitle>
                            <Dumbbell className="size-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl tracking-wider md:text-3xl lg:text-4xl xl:text-5xl">
                                <span>{sets}</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-xs font-normal tracking-wider text-muted-foreground uppercase">Reps Performed</CardTitle>
                            <Repeat2 className="size-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl tracking-wider md:text-3xl lg:text-4xl xl:text-5xl">
                                <span>{reps}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
