import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function DeleteExercise({ exerciseId }: { exerciseId: number }) {
    const { delete: destroy, processing, reset, clearErrors } = useForm<Required<{ password: string }>>({ password: '' });

    const deleteExercise: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('admin.exercises.destroy', exerciseId), {
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
                        Delete Exercise
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Are you sure you want to delete this exercise?</DialogTitle>
                    <DialogDescription>This cannot be undone. If the exercise has been used, you will not be able to delete it.</DialogDescription>
                    <form className="space-y-6" onSubmit={deleteExercise}>
                        <DialogFooter className="gap-2">
                            <DialogClose asChild>
                                <Button variant="secondary" onClick={closeModal}>
                                    Cancel
                                </Button>
                            </DialogClose>

                            <Button variant="destructive" disabled={processing} asChild>
                                <button type="submit">Delete exercise</button>
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
