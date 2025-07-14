import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Exercise, MuscleGroup } from '@/types/workouts';
import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

interface Props {
    muscleGroups: MuscleGroup[];
    addSelectedExercise: (exercise: Exercise) => void;
    removeAvailableExercise: (exerciseId: number) => void;
    availableExercises?: Exercise[];
}

export default function ExerciseSelection({ muscleGroups, addSelectedExercise, removeAvailableExercise, availableExercises }: Props) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={open} className="w-full max-w-full justify-between">
                        Select exercises...
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="PopoverContent w-full p-0">
                    <Command>
                        <CommandInput placeholder="Search exercises..." />
                        <CommandEmpty>No exercises found.</CommandEmpty>
                        <CommandList>
                            {muscleGroups.map((group) => (
                                <CommandGroup heading={group.name} key={group.id}>
                                    {availableExercises &&
                                        availableExercises
                                            .filter((exercise) => {
                                                return exercise.muscle_groups.some((muscle) => muscle.id === group.id);
                                            })
                                            .sort((a, b) => a.name.localeCompare(b.name))
                                            .map((exercise) => (
                                                <CommandItem
                                                    key={exercise.id}
                                                    value={exercise.name}
                                                    onSelect={() => {
                                                        addSelectedExercise(exercise);
                                                        removeAvailableExercise(exercise.id);
                                                    }}
                                                >
                                                    {exercise.name}
                                                </CommandItem>
                                            ))}
                                </CommandGroup>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
