import { Button } from '@/components/ui/button';
import { FriendRequest } from '@/pages/friends';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Accept({ request }: { request: FriendRequest }) {
    const { put } = useForm();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('friends.accept', request.id), {
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={submit}>
            <Button type="submit" size="sm">
                Accept
            </Button>
        </form>
    );
}
