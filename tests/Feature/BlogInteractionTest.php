<?php

use App\Models\BlogPost;
use App\Models\User;

test('guests can leave a comment', function () {
    $post = BlogPost::factory()->create([
        'slug' => 'guest-comments',
    ]);

    $response = $this->post(route('blog.comments.store', ['blogPost' => $post->slug]), [
        'guest_name' => 'Jamie',
        'guest_email' => 'jamie@example.com',
        'body' => 'Great post!',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('blog_post_comments', [
        'blog_post_id' => $post->id,
        'guest_name' => 'Jamie',
        'guest_email' => 'jamie@example.com',
        'body' => 'Great post!',
    ]);
});

test('authenticated users can like and unlike a post', function () {
    $user = User::factory()->create();
    $post = BlogPost::factory()->create([
        'slug' => 'liked-post',
    ]);

    $likeResponse = $this->actingAs($user)->post(route('blog.like', ['blogPost' => $post->slug]));
    $likeResponse->assertRedirect();

    $this->assertDatabaseHas('blog_post_likes', [
        'blog_post_id' => $post->id,
        'user_id' => $user->id,
    ]);

    $unlikeResponse = $this->actingAs($user)->post(route('blog.like', ['blogPost' => $post->slug]));
    $unlikeResponse->assertRedirect();

    $this->assertDatabaseMissing('blog_post_likes', [
        'blog_post_id' => $post->id,
        'user_id' => $user->id,
    ]);
});

test('guests cannot like a post', function () {
    $post = BlogPost::factory()->create([
        'slug' => 'no-guest-likes',
    ]);

    $response = $this->post(route('blog.like', ['blogPost' => $post->slug]));

    $response->assertRedirect(route('login'));
});
