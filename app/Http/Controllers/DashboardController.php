<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\BlogPostComment;
use App\Models\BlogPostLike;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $totalPosts = BlogPost::query()->count();
        $postsLastWeek = BlogPost::query()
            ->where('created_at', '>=', now()->subDays(7))
            ->count();
        $totalUsers = User::query()->count();
        $adminUsers = User::query()->where('is_admin', true)->count();
        $totalComments = BlogPostComment::query()->count();
        $totalLikes = BlogPostLike::query()->count();

        $latestPosts = BlogPost::query()
            ->latest()
            ->take(5)
            ->get()
            ->map(fn (BlogPost $post) => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'created_at' => $post->created_at?->toDateString(),
            ]);

        return Inertia::render('dashboard', [
            'stats' => [
                'total_posts' => $totalPosts,
                'posts_last_week' => $postsLastWeek,
                'total_users' => $totalUsers,
                'admin_users' => $adminUsers,
                'total_comments' => $totalComments,
                'total_likes' => $totalLikes,
            ],
            'latest_posts' => $latestPosts,
        ]);
    }
}
