<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBlogCommentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $isGuest = $this->user() === null;

        return [
            'body' => ['required', 'string', 'max:2000'],
            'guest_name' => [Rule::requiredIf($isGuest), 'string', 'max:100'],
            'guest_email' => [Rule::requiredIf($isGuest), 'email', 'max:255'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'body.required' => 'Please enter a comment.',
            'guest_name.required' => 'Please enter your name.',
            'guest_email.required' => 'Please enter your email.',
            'guest_email.email' => 'Please enter a valid email address.',
        ];
    }
}
