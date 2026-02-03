<?php

use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('non-admins cannot access admin blog posts', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('admin.blog-posts.index'));

    $response->assertForbidden();
});

test('admins can view the admin blog index', function () {
    $admin = User::factory()->admin()->create();

    $response = $this->actingAs($admin)->get(route('admin.blog-posts.index'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/blog-posts/index')
    );
});

test('admins can create a blog post with a cover image', function () {
    Storage::fake('public');
    $admin = User::factory()->admin()->create();

    $payload = [
        'title' => 'Auric launch',
        'slug' => 'auric-launch',
        'excerpt' => 'A short launch story.',
        'body' => '<p>Longer body copy goes here.</p><script>alert("bad")</script>',
        'cover_image' => UploadedFile::fake()->image('cover.jpg'),
    ];

    $response = $this->actingAs($admin)->post(route('admin.blog-posts.store'), $payload);

    $post = BlogPost::query()->firstOrFail();

    $response->assertRedirect(route('admin.blog-posts.edit', $post));

    expect($post->title)->toBe('Auric launch');
    expect($post->cover_image_path)->not->toBeNull();
    expect($post->body)->not->toContain('<script>');
    Storage::disk('public')->assertExists($post->cover_image_path);
});

test('admins can update and delete blog posts', function () {
    Storage::fake('public');
    $admin = User::factory()->admin()->create();

    $oldPath = UploadedFile::fake()->image('old.jpg')->store('blog-covers', 'public');
    $post = BlogPost::factory()->create([
        'cover_image_path' => $oldPath,
    ]);

    $response = $this->actingAs($admin)->put(route('admin.blog-posts.update', $post), [
        'title' => 'Updated story',
        'slug' => 'updated-story',
        'excerpt' => 'Updated excerpt.',
        'body' => '<p>Updated body copy.</p><script>alert("bad")</script>',
        'cover_image' => UploadedFile::fake()->image('new.jpg'),
    ]);

    $response->assertRedirect();

    $post->refresh();
    Storage::disk('public')->assertMissing($oldPath);
    Storage::disk('public')->assertExists($post->cover_image_path);
    expect($post->body)->not->toContain('<script>');

    $deleteResponse = $this->actingAs($admin)->delete(route('admin.blog-posts.destroy', $post));

    $deleteResponse->assertRedirect(route('admin.blog-posts.index'));
    $this->assertDatabaseMissing('blog_posts', ['id' => $post->id]);
    Storage::disk('public')->assertMissing($post->cover_image_path);
});
