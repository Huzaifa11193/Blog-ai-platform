<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class BlogPostLikeController extends Controller
{
    public function like(Request $request, BlogPost $blogPost): RedirectResponse
    {
        $user = $request->user();

        $existing = $blogPost->likes()
            ->where('user_id', $user->id)
            ->first();

        if ($existing) {
            $existing->delete();
        } else {
            $blogPost->likes()->create([
                'user_id' => $user->id,
            ]);
        }

        return back();
    }
}
