<?php

namespace App\Http\Requests;

use App\Models\BlogPost;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class UpdateBlogPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $blogPost = $this->route('blog_post');

        return $blogPost instanceof BlogPost
            ? $this->user()?->can('update', $blogPost) ?? false
            : false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $blogPost = $this->route('blog_post');

        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('blog_posts', 'slug')->ignore($blogPost?->id),
            ],
            'excerpt' => ['required', 'string', 'max:300'],
            'body' => ['required', 'string'],
            'cover_image' => ['nullable', 'image', 'max:4096'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Please enter a title.',
            'slug.required' => 'Please provide a slug or leave it blank to auto-generate.',
            'slug.unique' => 'That slug is already in use.',
            'excerpt.required' => 'Please add a short excerpt.',
            'body.required' => 'Please add the blog content.',
            'cover_image.image' => 'The cover image must be an image file.',
            'cover_image.max' => 'Cover images must be 4MB or smaller.',
        ];
    }

    protected function prepareForValidation(): void
    {
        if (! $this->filled('slug') && $this->filled('title')) {
            $this->merge([
                'slug' => Str::slug($this->input('title')),
            ]);
        }
    }
}
