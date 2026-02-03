<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBlogPostRequest;
use App\Http\Requests\UpdateBlogPostRequest;
use App\Models\BlogPost;
use App\Actions\SanitizeHtml;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BlogPostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $this->authorize('viewAny', BlogPost::class);

        return Inertia::render('admin/blog-posts/index', [
            'posts' => BlogPost::query()
                ->latest()
                ->paginate(10)
                ->through(fn (BlogPost $post) => $this->toSummary($post)),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $this->authorize('create', BlogPost::class);

        return Inertia::render('admin/blog-posts/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBlogPostRequest $request): RedirectResponse
    {
        $this->authorize('create', BlogPost::class);

        $data = $request->validated();
        $sanitizeHtml = app(SanitizeHtml::class);

        $coverPath = $request->file('cover_image')
            ? $request->file('cover_image')->store('blog-covers', 'public')
            : null;

        $blogPost = BlogPost::create([
            'user_id' => $request->user()->id,
            'title' => $data['title'],
            'slug' => $data['slug'],
            'excerpt' => $data['excerpt'],
            'body' => $sanitizeHtml($data['body']),
            'cover_image_path' => $coverPath,
        ]);

        return redirect()
            ->route('admin.blog-posts.edit', $blogPost)
            ->with('success', 'Blog post created.');
    }

    /**
     * Display the specified resource.
     */
    public function edit(BlogPost $blogPost): Response
    {
        $this->authorize('update', $blogPost);

        return Inertia::render('admin/blog-posts/edit', [
            'post' => $this->toForm($blogPost),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBlogPostRequest $request, BlogPost $blogPost): RedirectResponse
    {
        $this->authorize('update', $blogPost);

        $data = $request->validated();
        $sanitizeHtml = app(SanitizeHtml::class);

        $coverPath = $blogPost->cover_image_path;

        if ($request->hasFile('cover_image')) {
            if ($coverPath) {
                Storage::disk('public')->delete($coverPath);
            }

            $coverPath = $request->file('cover_image')->store('blog-covers', 'public');
        }

        $blogPost->update([
            'title' => $data['title'],
            'slug' => $data['slug'],
            'excerpt' => $data['excerpt'],
            'body' => $sanitizeHtml($data['body']),
            'cover_image_path' => $coverPath,
        ]);

        return back()->with('success', 'Blog post updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BlogPost $blogPost): RedirectResponse
    {
        $this->authorize('delete', $blogPost);

        if ($blogPost->cover_image_path) {
            Storage::disk('public')->delete($blogPost->cover_image_path);
        }

        $blogPost->delete();

        return redirect()
            ->route('admin.blog-posts.index')
            ->with('success', 'Blog post deleted.');
    }

    /**
     * @return array<string, mixed>
     */
    protected function toSummary(BlogPost $post): array
    {
        return [
            'id' => $post->id,
            'title' => $post->title,
            'slug' => $post->slug,
            'created_at' => $post->created_at?->toDateString(),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    protected function toForm(BlogPost $post): array
    {
        return [
            'id' => $post->id,
            'title' => $post->title,
            'slug' => $post->slug,
            'excerpt' => $post->excerpt,
            'body' => $post->body,
            'cover_image_url' => $post->cover_image_path
                ? Storage::disk('public')->url($post->cover_image_path)
                : null,
        ];
    }
}
