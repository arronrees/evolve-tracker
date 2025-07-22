import Accept from '@/components/friends/Accept';
import Reject from '@/components/friends/Reject';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

type FriendForm = {
    email: string;
};

export interface FriendRequest {
    id: number;
    created_at: string;
    status: 'pending' | 'accepted' | 'rejected';
    sender: {
        id: number;
        email: string;
        name: string;
    };
}

interface Props {
    pendingRequests: FriendRequest[];
    friends: {
        id: number;
        email: string;
        name: string;
    }[];
}

export default function Friends({ pendingRequests, friends }: Props) {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<FriendForm>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('friends.store'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Friends" />

            <div className="mx-auto w-full max-w-3xl px-4 py-8">
                <div className="space-y-6">
                    <HeadingSmall title="Add Freind" description="Enter the email of your friend to send them an invite." />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>

                            <Input
                                type="email"
                                id="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="email"
                                placeholder="Email"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Send Request</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Request Sent</p>
                            </Transition>
                        </div>
                    </form>
                </div>

                <Separator className="my-6" />

                {pendingRequests && pendingRequests.length > 0 && (
                    <>
                        <div className="space-y-6">
                            <HeadingSmall title="Pending Requests" description="Here are the requests you have not responded to yet." />

                            <ul className="flex flex-col gap-2">
                                {pendingRequests.map((request) => (
                                    <li
                                        key={request.id}
                                        className="flex items-center justify-between rounded border border-slate-200 bg-slate-50 px-4 py-2"
                                    >
                                        <div className="flex flex-col">
                                            <p className="font-medium">{request.sender.name}</p>
                                            <p className="text-sm text-muted-foreground">{request.sender.email}</p>
                                        </div>
                                        <div className="flex gap-1">
                                            <Accept request={request} />
                                            <Reject request={request} />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Separator className="my-6" />
                    </>
                )}

                {friends && friends.length > 0 && (
                    <div className="space-y-6">
                        <HeadingSmall title="My Friends" description="Here are all your friends" />

                        <ul className="flex flex-col gap-2">
                            {friends.map((friend) => (
                                <li key={friend.id} className="flex flex-col rounded border border-slate-200 bg-slate-50/50 px-4 py-2">
                                    <p className="font-medium">{friend.name}</p>
                                    <p className="text-sm text-muted-foreground">{friend.email}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
