import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { XIcon } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { WorkoutExercise, WorkoutSet } from './CreateWorkoutForm';

interface Props {
    selection: WorkoutExercise;
    updateSelectedExercise: (exerciseId: number, updatedExercise: Partial<WorkoutExercise>) => void;
    set: WorkoutSet;
    index: number;
}

function validateNumber(value: string) {
    if (value && parseFloat(value)) {
        return parseFloat(value);
    }

    return 0;
}

export default function ExerciseSet({ set, index, updateSelectedExercise, selection }: Props) {
    function updateSetReps(reps: string) {
        updateSelectedExercise(selection.exercise_id, {
            sets: selection.sets.map((s) => {
                if (s.id !== set.id) return s;

                return {
                    ...s,
                    reps: validateNumber(reps),
                };
            }),
        });
    }

    function updateSetWeight(weight: string) {
        updateSelectedExercise(selection.exercise_id, {
            sets: selection.sets.map((s) => {
                if (s.id !== set.id) return s;

                return {
                    ...s,
                    weight: validateNumber(weight),
                };
            }),
        });
    }

    function updateSetTime(timeInSeconds: string) {
        updateSelectedExercise(selection.exercise_id, {
            sets: selection.sets.map((s) => {
                if (s.id !== set.id) return s;

                return {
                    ...s,
                    duration_seconds: validateNumber(timeInSeconds),
                };
            }),
        });
    }

    function updateSetDistance(distance: string) {
        updateSelectedExercise(selection.exercise_id, {
            sets: selection.sets.map((s) => {
                if (s.id !== set.id) return s;

                return {
                    ...s,
                    distance_meters: validateNumber(distance),
                };
            }),
        });
    }

    function removeSet() {
        updateSelectedExercise(selection.exercise_id, { sets: selection.sets.filter((s) => s.id !== set.id) });
    }

    return (
        <div>
            <p className="mb-1 font-semibold">Set {index + 1}</p>
            <div className="flex items-end gap-2">
                {selection.measurement === 'time' && <TimeInput updateSetTime={updateSetTime} time={set.duration_seconds} />}
                {selection.measurement === 'reps_only' && <RepsInput updateSetReps={updateSetReps} reps={set.reps} />}
                {selection.measurement === 'weight' && (
                    <WeightInput updateSetWeight={updateSetWeight} updateSetReps={updateSetReps} weight={set.weight} reps={set.reps} />
                )}
                {selection.measurement === 'time_or_distance' && (
                    <TimeOrDistanceInput
                        updateSetTime={updateSetTime}
                        updateSetDistance={updateSetDistance}
                        distance={set.distance_meters}
                        time={set.duration_seconds}
                    />
                )}
                {selection.measurement === 'distance' && <DistanceInput updateSetDistance={updateSetDistance} distance={set.distance_meters} />}
                <Button variant="ghost" className="max-w-max p-2" type="button" onClick={() => removeSet()}>
                    <XIcon className="h-3 w-3" />
                </Button>
            </div>
        </div>
    );
}

function TimeInput({ updateSetTime, time }: { updateSetTime: (time: string) => void; time?: number | string }) {
    const totalSeconds = time ? Number(time) : null;
    const [timeMinutes, setTimeMinutes] = useState<number | ''>(totalSeconds ? Math.floor(totalSeconds / 60) : '');
    const [timeSeconds, setTimeSeconds] = useState<number | ''>(totalSeconds ? totalSeconds % 60 : '');

    const updateTimeoutRef = useRef<NodeJS.Timeout>(null);

    const debounceUpdate = useCallback(
        (minutes: number, seconds: number) => {
            if (updateTimeoutRef.current) {
                clearTimeout(updateTimeoutRef.current);
            }

            // Debounce the update to prevent infinite re-renders
            updateTimeoutRef.current = setTimeout(() => {
                updateSetTime((minutes * 60 + seconds).toString());
            }, 300);
        },
        [updateSetTime],
    );

    useEffect(() => {
        return () => {
            if (updateTimeoutRef.current) {
                clearTimeout(updateTimeoutRef.current);
            }
        };
    }, []);

    const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const seconds = Number(e.target.value);

        // Auto-convert seconds >= 60 to minutes
        if (seconds >= 60) {
            const mewMinutes = Math.floor(seconds / 60);
            const newSeconds = seconds % 60;

            setTimeMinutes(mewMinutes);
            setTimeSeconds(newSeconds);
            debounceUpdate(mewMinutes, newSeconds);
        } else {
            setTimeSeconds(seconds);
            debounceUpdate(Number(timeMinutes), seconds);
        }
    };

    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const minutes = Number(e.target.value);
        setTimeMinutes(minutes);
        debounceUpdate(minutes, Number(timeSeconds));
    };

    return (
        <div className="w-full">
            <div className="flex gap-2">
                <div className="flex w-full flex-col gap-1">
                    <Label htmlFor="time_minutes" className="text-xs text-muted-foreground">
                        Minutes
                    </Label>
                    <Input
                        type="number"
                        placeholder="Minutes"
                        name="time_minutes"
                        id="time_minutes"
                        min={0}
                        step={1}
                        value={timeMinutes}
                        onChange={handleMinutesChange}
                        autoFocus
                    />
                </div>
                <div className="flex w-full flex-col gap-1">
                    <Label htmlFor="time_seconds" className="text-xs text-muted-foreground">
                        Seconds
                    </Label>
                    <Input
                        type="number"
                        placeholder="Seconds"
                        name="time_seconds"
                        id="time_seconds"
                        min={0}
                        max={59}
                        step={1}
                        value={timeSeconds}
                        onChange={handleSecondsChange}
                    />
                </div>
            </div>
        </div>
    );
}

function RepsInput({ updateSetReps, reps }: { updateSetReps: (reps: string) => void; reps?: number | string }) {
    return (
        <div className="flex w-full flex-col gap-1">
            <Label htmlFor="reps" className="text-xs text-muted-foreground">
                Reps
            </Label>
            <Input
                type="number"
                placeholder="Reps"
                name="reps"
                min={0}
                step={0.1}
                defaultValue={reps}
                onChange={(e) => {
                    updateSetReps(e.target.value);
                }}
                autoFocus
            />
        </div>
    );
}

function WeightInput({
    updateSetWeight,
    updateSetReps,
    reps,
    weight,
}: {
    updateSetWeight: (weight: string) => void;
    updateSetReps: (reps: string) => void;
    reps?: number | string;
    weight?: number | string;
}) {
    return (
        <>
            <div className="flex w-full flex-col gap-1">
                <Label className="text-xs text-muted-foreground">Reps</Label>
                <Input
                    type="number"
                    placeholder="Reps"
                    name="reps"
                    min={0}
                    step={0.1}
                    defaultValue={reps}
                    onChange={(e) => {
                        updateSetReps(e.target.value);
                    }}
                    autoFocus
                />
            </div>
            <div className="flex w-full flex-col gap-1">
                <Label className="text-xs text-muted-foreground">Weight (kg)</Label>
                <Input
                    type="number"
                    placeholder="Weight (kg)"
                    name="weight"
                    min={0}
                    step={0.1}
                    defaultValue={weight}
                    onChange={(e) => {
                        updateSetWeight(e.target.value);
                    }}
                />
            </div>
        </>
    );
}

function TimeOrDistanceInput({
    updateSetTime,
    updateSetDistance,
    distance,
    time,
}: {
    updateSetTime: (time: string) => void;
    updateSetDistance: (distance: string) => void;
    distance?: number | string;
    time?: number | string;
}) {
    return (
        <>
            {!time && (
                <div className="flex w-full flex-col gap-1">
                    <Label className="text-xs text-muted-foreground">Distance (meters)</Label>
                    <Input
                        type="number"
                        placeholder="Distance (meters)"
                        name="distance"
                        min={0}
                        step={1}
                        defaultValue={distance}
                        onChange={(e) => {
                            updateSetDistance(e.target.value);
                        }}
                        autoFocus
                    />
                </div>
            )}
            {!distance && (
                <div className="flex w-full flex-col gap-1">
                    <TimeInput updateSetTime={updateSetTime} time={time} />
                </div>
            )}
        </>
    );
}

function DistanceInput({ updateSetDistance, distance }: { updateSetDistance: (distance: string) => void; distance?: number | string }) {
    return (
        <div className="flex w-full flex-col gap-1">
            <Label className="text-xs text-muted-foreground">Distance (meters)</Label>
            <Input
                type="number"
                placeholder="Distance (meters)"
                name="distance"
                min={0}
                step={0.1}
                defaultValue={distance}
                onChange={(e) => {
                    updateSetDistance(e.target.value);
                }}
                autoFocus
            />
        </div>
    );
}
