import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function DeleteWorkout({ workoutId }: { workoutId: number }) {
    const { delete: destroy, processing, reset, clearErrors } = useForm<Required<{ password: string }>>({ password: '' });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('workouts.destroy', workoutId), {
            preserveScroll: true,
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                        Delete workout
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Are you sure you want to delete this workout?</DialogTitle>
                    <DialogDescription>This cannot be undone.</DialogDescription>
                    <form className="space-y-6" onSubmit={deleteUser}>
                        <DialogFooter className="gap-2">
                            <DialogClose asChild>
                                <Button variant="secondary" onClick={closeModal}>
                                    Cancel
                                </Button>
                            </DialogClose>

                            <Button variant="destructive" disabled={processing} asChild>
                                <button type="submit">Delete workout</button>
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
