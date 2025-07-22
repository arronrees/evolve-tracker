import { Button } from '@/components/ui/button';
import { FriendRequest } from '@/pages/friends';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Reject({ request }: { request: FriendRequest }) {
    const { put } = useForm();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('friends.reject', request.id), {
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={submit}>
            <Button type="submit" variant="destructive" size="sm">
                Decline
            </Button>
        </form>
    );
}
