<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

class BlogController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
            'posts' => BlogPost::query()
                ->latest()
                ->with('author')
                ->take(3)
                ->get()
                ->map(fn (BlogPost $post) => $this->toSummary($post)),
        ]);
    }

    public function index(): Response
    {
        return Inertia::render('blog/index', [
            'posts' => BlogPost::query()
                ->latest()
                ->with('author')
                ->paginate(9)
                ->through(fn (BlogPost $post) => $this->toSummary($post)),
        ]);
    }

    public function show(Request $request, BlogPost $blogPost): Response
    {
        $blogPost->load(['author', 'comments.author']);
        $likesCount = $blogPost->likes()->count();
        $likedByUser = $request->user()
            ? $blogPost->likes()->where('user_id', $request->user()->id)->exists()
            : false;
        $comments = $blogPost->comments()
            ->latest()
            ->get()
            ->map(fn ($comment) => [
                'id' => $comment->id,
                'body' => $comment->body,
                'author_name' => $comment->author?->name ?? $comment->guest_name,
                'created_at' => $comment->created_at?->toDateString(),
            ]);

        return Inertia::render('blog/show', [
            'post' => $this->toDetail($blogPost),
            'likes_count' => $likesCount,
            'liked_by_user' => $likedByUser,
            'comments' => $comments,
        ]);
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
            'excerpt' => $post->excerpt,
            'cover_image_url' => $post->cover_image_path
                ? Storage::disk('public')->url($post->cover_image_path)
                : null,
            'author' => [
                'name' => $post->author?->name,
            ],
            'created_at' => $post->created_at?->toDateString(),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    protected function toDetail(BlogPost $post): array
    {
        return [
            ...$this->toSummary($post),
            'body' => $post->body,
        ];
    }
}
