<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RecordWorkoutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'exercises' => ['nullable', 'array'],
            'exercises.*.exercise_id' => ['required', 'integer', 'min:1'],
            'exercises.*.order' => ['required', 'integer', 'min:1'],

            'exercises.*.sets' => ['required', 'array', 'min:0'],
            'exercises.*.sets.*.id' => ['required', 'string', 'max:255'],
            'exercises.*.sets.*.order' => ['required', 'integer', 'min:1'],
            'exercises.*.sets.*.reps' => ['nullable', 'integer', 'min:0'],
            'exercises.*.sets.*.weight' => ['nullable', 'numeric', 'min:0'],
            'exercises.*.sets.*.duration_seconds' => ['nullable', 'integer', 'min:0'],
            'exercises.*.sets.*.distance_meters' => ['nullable', 'integer', 'min:0'],
            'exercises.*.sets.*.rest_seconds' => ['nullable', 'integer', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Workout name is required.',
            'exercises.*.measurement.in' => 'Invalid measurement type.',
            'exercises.*.sets.min' => 'Each exercise must have at least one set.',
        ];
    }
}
