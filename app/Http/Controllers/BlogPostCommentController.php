<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBlogCommentRequest;
use App\Models\BlogPost;
use Illuminate\Http\RedirectResponse;

class BlogPostCommentController extends Controller
{
    public function store(StoreBlogCommentRequest $request, BlogPost $blogPost): RedirectResponse
    {
        $data = $request->validated();
        $user = $request->user();

        $blogPost->comments()->create([
            'user_id' => $user?->id,
            'guest_name' => $user ? null : $data['guest_name'],
            'guest_email' => $user ? null : $data['guest_email'],
            'body' => trim(strip_tags($data['body'])),
        ]);

        return back()->with('success', 'Comment added.');
    }
}
