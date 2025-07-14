<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateWorkoutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'is_public' => ['nullable', 'boolean'],

            'exercises' => ['nullable', 'array'],
            'exercises.*.exercise_id' => ['required', 'integer', 'min:1'],
            'exercises.*.name' => ['required', 'string', 'max:255'],
            'exercises.*.order' => ['required', 'integer', 'min:1'],
            'exercises.*.notes' => ['nullable', 'string', 'max:1000'],

            'exercises.*.sets' => ['required', 'array', 'min:1'],
            'exercises.*.sets.*.id' => ['required', 'string', 'max:255'],
            'exercises.*.sets.*.order' => ['required', 'integer', 'min:1'],
            'exercises.*.sets.*.reps' => ['nullable', 'integer', 'min:1'],
            'exercises.*.sets.*.weight' => ['nullable', 'numeric', 'min:0'],
            'exercises.*.sets.*.duration_seconds' => ['nullable', 'integer', 'min:1'],
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
